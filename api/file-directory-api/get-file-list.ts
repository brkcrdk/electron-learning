import { desc } from 'drizzle-orm';
import { ipcMain } from 'electron';
import type { ApiResponseProps } from 'types/api-response-types';

import { getCurrentUser } from '@api/user-session';
import { getDb } from '@db/client';
import { mediaFiles, type MediaFile } from '@db/schema';

function getFileList() {
  ipcMain.handle('get-file-list', async (): ApiResponseProps<MediaFile[]> => {
    try {
      const db = getDb();

      const currentUser = getCurrentUser();

      if (!currentUser) {
        return {
          success: false,
          error: 'Giriş yapmış kullanıcı bulunamadı.',
        };
      }

      if (currentUser.role !== 'super-admin') {
        return {
          success: false,
          error: 'Bu işlemi yapmak için yetkiniz yok.',
        };
      }

      const fileList = await db.select().from(mediaFiles).orderBy(desc(mediaFiles.createdAt));

      return {
        success: true,
        data: fileList,
      };
    } catch (error) {
      console.error('get file list error', error);
      throw error;
    }
  });
}

export default getFileList;
