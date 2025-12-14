import { eq } from 'drizzle-orm';
import { ipcMain } from 'electron';
import { remove } from 'fs-extra';

import { getDb } from '@db/client';
import { mediaFiles } from '@db/schema';

import { getFullPathFromRelative } from './upload-file/get-file-path';
import type { ApiResponseProps } from '../../types/api-response-types';

/**
 * Bu method ile dosyalara yüklenmiş bir dosyayı hem veritabanından
 * hem de dosya sisteminden siliyoruz.
 */
function deleteFile() {
  ipcMain.handle('delete-file', async (_, fileId: number): ApiResponseProps<string> => {
    try {
      const db = getDb();

      if (!fileId) {
        return { success: false, error: 'Dosya ID bulunamadı.' };
      }

      // Önce veritabanından dosya bilgisini al
      const [file] = await db.select().from(mediaFiles).where(eq(mediaFiles.id, fileId)).limit(1);

      if (!file) {
        return { success: false, error: 'Dosya bulunamadı.' };
      }

      // Fiziksel dosyayı sil
      try {
        const fullPath = getFullPathFromRelative(file.filePath);
        await remove(fullPath);
      } catch (fileError) {
        // Dosya zaten silinmiş olabilir, bu durumda devam et
        console.warn('Fiziksel dosya silinirken hata oluştu (dosya zaten silinmiş olabilir):', fileError);
      }

      // Veritabanı kaydını sil
      await db.delete(mediaFiles).where(eq(mediaFiles.id, fileId));

      return { success: true, data: 'Dosya silindi.' };
    } catch (error) {
      console.error('remove file error', error);
      return { success: false, error: String(error) };
    }
  });
}

export default deleteFile;
