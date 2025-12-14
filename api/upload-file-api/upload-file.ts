import { join } from 'path';

import { app, ipcMain } from 'electron';
import { ensureDir, createWriteStream } from 'fs-extra';

import { cleanupStream, deleteStream, getMetadata, getStream, setStream } from './streamManager';
import type { FileUploadResponseType, FileUploadTypes, UploadFilePayload } from './types';

const fileUploadPathMap: Record<FileUploadTypes, string> = {
  video: 'videos',
  stories: 'stories',
  pdfs: 'pdfs',
  images: 'images',
};

function uploadFile() {
  ipcMain.handle('upload-file', async (_, data: UploadFilePayload): FileUploadResponseType => {
    try {
      // İlk chunk kontrolü (chunkIndex === 0)
      if (data.chunkIndex === 0) {
        // Dizin yoksa oluştur
        const userDataPath = app.getPath('userData');
        const contentRoot = join(userDataPath, 'content');
        const uploadFolder = fileUploadPathMap[data.fileType];
        const uploadPath = join(contentRoot, uploadFolder);

        await ensureDir(uploadPath);

        // Dosya yolunu oluştur
        const filePath = join(uploadPath, data.fileName);

        // Stream oluştur
        const writeStream = createWriteStream(filePath);

        // İlk chunk'ı yaz
        const buffer = Buffer.from(data.chunkData);
        writeStream.write(buffer);

        // Tek chunk durumu kontrolü
        if (data.totalChunks === 1) {
          // Tek chunk varsa stream'i kapat ve son cevabı döndür
          return new Promise((resolve, reject) => {
            // Error handler'ı önce ekle (race condition önlemek için)
            writeStream.on('error', error => {
              reject(error);
            });

            writeStream.end(() => {
              console.log('File saved to:', filePath);
              resolve({
                success: true,
                data: {
                  id: 0,
                  mediaType: data.fileType,
                  fileName: data.fileName,
                  fileFullUrl: filePath,
                  fileSize: data.fileSize,
                },
              });
            });
          });
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
                mediaType: data.fileType,
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
