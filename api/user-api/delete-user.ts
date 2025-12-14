import { eq } from 'drizzle-orm';
import { ipcMain } from 'electron';

import { getDb } from '@db/client';
import { users, type User } from '@db/schema';

import type { ApiResponseProps } from '../../types/api-response-types';
import { getCurrentUser } from '../user-session';

function deleteUser() {
  ipcMain.handle('delete-user', async (_, userId: User['id']): ApiResponseProps<string> => {
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

      if (currentUser.id === userId) {
        return {
          success: false,
          error: 'Kendinizi silemezsiniz.',
        };
      }

      await db.delete(users).where(eq(users.id, userId));

      return {
        success: true,
        data: 'Kullanıcı silindi.',
      };
    } catch (error) {
      console.error('delete user error', error);
      throw error;
    }
  });
}

export default deleteUser;
