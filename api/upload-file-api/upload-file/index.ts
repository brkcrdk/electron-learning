import { ipcMain } from 'electron';
import { createWriteStream } from 'fs-extra';

import { getCurrentUser } from '@api/user-session';

import { cleanupStream, getMetadata, getStream, setStream } from '../stream-manager';
import type { FileUploadResponseType, UploadFilePayload } from '../types';
import finalizeAndSave from './finalize-upload';
import { getFullFilePath } from './get-file-path';

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

      const { mediaType, fileName, chunkData, fileSize, totalChunks, chunkIndex, uploadId } = data;

      // İlk chunk kontrolü (chunkIndex === 0)
      if (chunkIndex === 0) {
        // Dizin yoksa oluştur ve full path al
        const filePath = await getFullFilePath({ mediaType, fileName });

        // Stream oluştur
        const writeStream = createWriteStream(filePath);

        // İlk chunk'ı yaz
        const buffer = Buffer.from(chunkData);
        writeStream.write(buffer);

        // Tek chunk durumu kontrolü
        if (data.totalChunks === 1) {
          return finalizeAndSave({
            writeStream,
            filePath,
            fileName,
            fileSize,
            mediaType,
            uploadedBy: currentUser.id,
            // uploadId yok çünkü tek chunk, cleanup gerekmez
          });
        }

        // Çoklu chunk durumu: Stream ve metadata'yı kaydet
        setStream(uploadId, writeStream, {
          filePath,
          totalChunks,
          fileName,
        });

        // İlk chunk başarılı
        return {
          success: true,
          data: 'İlk chunk başarılı bir şekilde yazıldı, upload başlatıldı..',
        };
      }

      // Sonraki chunk'lar
      const stream = getStream(uploadId);
      const metadata = getMetadata(uploadId);

      if (!stream || !metadata) {
        return {
          success: false,
          error: `Upload session not found: ${data.uploadId}`,
        };
      }

      // Validation: Dosya bilgileri tutarlı mı kontrol et
      if (metadata.fileName !== fileName || metadata.totalChunks !== totalChunks) {
        return {
          success: false,
          error: `Upload session mismatch for uploadId: ${uploadId}`,
        };
      }

      // Chunk'ı stream'e yaz
      const buffer = Buffer.from(chunkData);
      stream.write(buffer);

      // Son chunk kontrolü
      if (chunkIndex === totalChunks - 1) {
        return finalizeAndSave({
          writeStream: stream,
          filePath: metadata.filePath,
          fileName: data.fileName,
          fileSize: data.fileSize,
          mediaType: data.mediaType,
          uploadedBy: currentUser.id,
          uploadId: data.uploadId, // Cleanup için gerekli
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
