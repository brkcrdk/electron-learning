import type { WriteStream } from 'fs';

import { getDb } from '@db/client';
import { mediaFiles, type MediaFileTypes } from '@db/schema';

import type { ApiResponseProps } from '../../../types/api-response-types';
import { cleanupStream, deleteStream } from '../stream-manager';
import type { FileUploadResponse } from '../types';
import { getFullPathFromRelative, getRelativePathFromFull } from './get-file-path';

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

        // Veritabanına kaydet
        const db = getDb();
        const [insertedFile] = await db
          .insert(mediaFiles)
          .values({
            filePath: relativePath, // Relative path kaydediliyor
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

        // Response için full path oluştur (frontend'e gönderirken)
        const fullPathForResponse = getFullPathFromRelative(relativePath);

        console.log('File saved to:', filePath);
        console.log('Relative path saved to DB:', relativePath);

        resolve({
          success: true,
          data: {
            id: insertedFile.id,
            mediaType,
            fileName,
            fileFullUrl: fullPathForResponse,
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
