import { ipcMain } from 'electron';
import { createWriteStream } from 'fs-extra';

import { getCurrentUser } from '@api/user-session';

import { cleanupStream, deleteStream, getMetadata, getStream, setStream } from '../stream-manager';
import type { FileUploadResponseType, UploadFilePayload } from '../types';
import finalizeUpload from './finalize-upload';
import getFilePath from './get-file-path';

function uploadFile() {
  ipcMain.handle('upload-file', async (_, data: UploadFilePayload): FileUploadResponseType => {
    try {
      const currentUser = getCurrentUser();

      if (!currentUser) {
        return {
          success: false,
          error: 'Giriş yapmış kullanıcı bulunamadı.',
        };
      }

      if (currentUser.role === 'user') {
        return {
          success: false,
          error: 'Bu işlemi yapmak için yetkiniz yok.',
        };
      }

      const { mediaType, fileName, chunkData, fileSize } = data;

      // İlk chunk kontrolü (chunkIndex === 0)
      if (data.chunkIndex === 0) {
        // Dizin yoksa oluştur
        const filePath = await getFilePath({ mediaType, fileName });

        // Stream oluştur
        const writeStream = createWriteStream(filePath);

        // İlk chunk'ı yaz
        const buffer = Buffer.from(chunkData);
        writeStream.write(buffer);

        // Tek chunk durumu kontrolü
        if (data.totalChunks === 1) {
          await finalizeUpload({ writeStream, filePath, fileName, fileSize, mediaType });
        }

        // Çoklu chunk durumu: Stream ve metadata'yı kaydet
        setStream(data.uploadId, writeStream, {
          filePath,
          totalChunks: data.totalChunks,
          fileName: data.fileName,
        });

        // İlk chunk başarılı
        return {
          success: true,
          data: 'İlk chunk başarılı bir şekilde yazıldı, upload başlatıldı..',
        };
      }

      // Sonraki chunk'lar
      const stream = getStream(data.uploadId);
      const metadata = getMetadata(data.uploadId);

      if (!stream || !metadata) {
        return {
          success: false,
          error: `Upload session not found: ${data.uploadId}`,
        };
      }

      // Validation: Dosya bilgileri tutarlı mı kontrol et
      if (metadata.fileName !== data.fileName || metadata.totalChunks !== data.totalChunks) {
        return {
          success: false,
          error: `Upload session mismatch for uploadId: ${data.uploadId}`,
        };
      }

      // Chunk'ı stream'e yaz
      const buffer = Buffer.from(data.chunkData);
      stream.write(buffer);

      // Son chunk kontrolü
      if (data.chunkIndex === data.totalChunks - 1) {
        // Stream'i kapat
        return new Promise((resolve, reject) => {
          // Error handler'ı önce ekle (race condition önlemek için)
          stream.on('error', async error => {
            // Hata durumunda temizle
            await cleanupStream(data.uploadId);
            reject(error);
          });

          stream.end(() => {
            // Temizle
            deleteStream(data.uploadId);

            console.log('File saved to:', metadata.filePath);
            resolve({
              success: true,
              data: {
                id: 0,
                mediaType: data.mediaType,
                fileName: data.fileName,
                fileFullUrl: metadata.filePath,
                fileSize: data.fileSize,
              },
            });
          });
        });
      }

      // Orta chunk'lar için sadece onay döndür
      return { success: true, data: 'Orta chunk başarılı bir şekilde yazıldı.' };
    } catch (error) {
      console.error('upload file error', error);

      // Hata durumunda stream'i ve dosyayı temizle
      await cleanupStream(data.uploadId);

      throw error;
    }
  });
}
export default uploadFile;
