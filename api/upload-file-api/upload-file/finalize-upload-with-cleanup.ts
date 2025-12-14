import type { WriteStream } from 'fs';

import { getDb } from '@db/client';
import { mediaFiles, type MediaFileTypes } from '@db/schema';

import type { ApiResponseProps } from '../../../types/api-response-types';
import { cleanupStream, deleteStream } from '../stream-manager';
import type { FileUploadResponse } from '../types';

interface Props {
  writeStream: WriteStream;
  filePath: string;
  fileName: string;
  fileSize: number;
  mediaType: MediaFileTypes;
  uploadId: string;
  uploadedBy: number;
}

/**
 * Finalize işlemi + Cleanup + Veritabanı kaydı
 * Çoklu chunk'ların son chunk'ı için kullanılır
 */
async function finalizeUploadWithCleanup({
  writeStream,
  filePath,
  fileName,
  fileSize,
  mediaType,
  uploadId,
  uploadedBy,
}: Props): ApiResponseProps<FileUploadResponse> {
  return new Promise((resolve, reject) => {
    // Error handler'ı önce ekle (race condition önlemek için)
    writeStream.on('error', async error => {
      // Hata durumunda temizle
      await cleanupStream(uploadId);
      reject(error);
    });

    writeStream.end(async () => {
      try {
        // Veritabanına kaydet
        const db = getDb();
        const [insertedFile] = await db
          .insert(mediaFiles)
          .values({
            filePath,
            fileName,
            fileSize,
            mediaType,
            uploadedBy,
          })
          .returning({ id: mediaFiles.id });

        // Stream ve metadata'yı temizle
        deleteStream(uploadId);

        console.log('File saved to:', filePath);
        resolve({
          success: true,
          data: {
            id: insertedFile.id,
            mediaType,
            fileName,
            fileFullUrl: filePath,
            fileSize,
          },
        });
      } catch (error) {
        // Veritabanı hatası durumunda temizle
        await cleanupStream(uploadId);
        reject(error);
      }
    });
  });
}

export default finalizeUploadWithCleanup;
