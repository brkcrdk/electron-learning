import { ipcMain } from 'electron/main';

import { getCurrentUser } from '@api/user-session';
import { getDb } from '@db/client';
import type { User } from '@db/schema';

import type { ApiResponseProps } from '../../types/api-response-types';

function extractUserFromExcel() {
  ipcMain.handle('extract-user-from-excel', async (_, file: File): ApiResponseProps<User[]> => {
    try {
      const db = getDb();

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

      return {
        success: true,
        data: [],
      };
    } catch (error) {
      console.error('get-paginated-user-list error:', error);
      return {
        success: false,
        error:
          error instanceof Error ? `Kullanıcı listesi alınırken bir hata oluştu: ${error.message}` : 'Kullanıcı listesi alınırken beklenmeyen bir hata oluştu.',
      };
    }
  });
}

export default extractUserFromExcel;
