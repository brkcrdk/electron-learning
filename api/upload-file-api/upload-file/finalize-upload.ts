import type { WriteStream } from 'fs';
import { join, parse } from 'path';

import { ensureDir, remove } from 'fs-extra';

import { getDb } from '@db/client';
import { mediaFiles, type MediaFileTypes } from '@db/schema';

import type { ApiResponseProps } from '../../../types/api-response-types';
import { cleanupStream, deleteStream } from '../stream-manager';
import type { FileUploadResponse } from '../types';
import extractZip from './extract-zip';
import { getRelativePathFromFull } from './get-file-path';

interface Props {
  writeStream: WriteStream;
  filePath: string; // Full path (dosya yazmak için kullanılan)
  fileName: string;
  fileSize: number;
  mediaType: MediaFileTypes;
  uploadedBy: number;
  uploadId?: string; // Opsiyonel: Çoklu chunk durumunda cleanup için gerekli
}

/**
 * Stream'i kapatır, dosyayı veritabanına kaydeder ve gerekirse cleanup yapar
 * Hem tek hem çoklu chunk durumları için kullanılır
 */
async function finalizeAndSave({ writeStream, filePath, fileName, fileSize, mediaType, uploadedBy, uploadId }: Props): ApiResponseProps<FileUploadResponse> {
  return new Promise((resolve, reject) => {
    // Error handler'ı önce ekle (race condition önlemek için)
    writeStream.on('error', async error => {
      // Hata durumunda cleanup yap (eğer uploadId varsa)
      if (uploadId) {
        await cleanupStream(uploadId);
      }
      reject(error);
    });

    writeStream.end(async () => {
      try {
        // Full path'i relative path'e çevir (veritabanına kaydetmek için)
        const relativePath = getRelativePathFromFull(filePath);

        // Varsayılan olarak dosyanın kendi path'i kaydedilecek
        let pathToSaveInDb = relativePath;

        // stories + zip özel durumu
        const isStories = mediaType === 'stories';
        const isZip = fileName.toLowerCase().endsWith('.zip');

        if (isStories && isZip) {
          // Örnek:
          // filePath:  .../content/stories/story_abc123.zip
          // dir:       .../content/stories
          // name:      story_abc123
          const { dir, name } = parse(filePath);
          const targetDirFull = join(dir, name);

          // Hedef klasörü oluştur
          await ensureDir(targetDirFull);

          // ZIP'i hedef klasöre aç
          await extractZip(filePath, targetDirFull);

          // ZIP dosyasını sil (sadece extract edilen dosyalar kalacak)
          await remove(filePath);

          // story.html path'ini oluştur ve relative path'e çevir
          const storyHtmlFullPath = join(targetDirFull, 'story.html');
          const storyHtmlRelativePath = getRelativePathFromFull(storyHtmlFullPath);

          pathToSaveInDb = storyHtmlRelativePath;
        }

        // Veritabanına kaydet
        const db = getDb();
        const [insertedFile] = await db
          .insert(mediaFiles)
          .values({
            filePath: pathToSaveInDb, // Relative path kaydediliyor
            fileName,
            fileSize,
            mediaType,
            uploadedBy,
          })
          .returning({ id: mediaFiles.id });

        // Stream ve metadata'yı temizle (eğer uploadId varsa)
        if (uploadId) {
          deleteStream(uploadId);
        }

        console.log('File saved to:', filePath);
        console.log('Relative path saved to DB:', pathToSaveInDb);

        resolve({
          success: true,
          data: {
            id: insertedFile.id,
            mediaType,
            fileName,
            fileFullUrl: pathToSaveInDb,
            fileSize,
          },
        });
      } catch (error) {
        // Veritabanı hatası durumunda cleanup yap (eğer uploadId varsa)
        if (uploadId) {
          await cleanupStream(uploadId);
        }
        reject(error);
      }
    });
  });
}

export default finalizeAndSave;
