import { eq } from 'drizzle-orm';
import { ipcMain } from 'electron';

import { db } from '@db/client';
import { users, type User } from '@db/schema';

import { getCurrentUser } from './user-session';
import type { ApiResponseProps } from '../types/api-response-types';

function deleteUserHandler() {
  ipcMain.handle('delete-user', async (_, data: User['id']): ApiResponseProps<string> => {
    try {
      const currentUser = getCurrentUser();

      if (!currentUser) {
        return {
          success: false,
          error: 'Giriş yapmış kullanıcı bulunamadı.',
        };
      }

      if (currentUser.roles === 'user') {
        return {
          success: false,
          error: 'Bu işlemi yapmak için yetkiniz yok.',
        };
      }

      if (currentUser.id === data) {
        return {
          success: false,
          error: 'Kendinizi silemezsiniz.',
        };
      }

      await db.delete(users).where(eq(users.id, data));

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

export default deleteUserHandler;
