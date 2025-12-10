import { eq } from 'drizzle-orm';
import { ipcMain } from 'electron';

import { db } from '@db/client';
import { users, type NewUserPayload } from '@db/schema';

import { getCurrentUser } from './user-session';
import type { ApiResponseProps } from '../types/api-response-types';

function updateUserHandler() {
  ipcMain.handle('update-user', async (_, data: NewUserPayload): ApiResponseProps<string> => {
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

      if (currentUser.roles !== 'super-admin' && data.roles === 'super-admin') {
        return {
          success: false,
          error: 'Super admin rolünü değiştiremezsiniz.',
        };
      }

      if (data.id) {
        await db.update(users).set(data).where(eq(users.id, data.id));
      } else {
        return {
          success: false,
          error: 'Kullanıcı bulunamadı.',
        };
      }

      return {
        success: true,
        data: 'Kullanıcı güncellendi.',
      };
    } catch (error) {
      console.error('update user error', error);
      throw error;
    }
  });
}

export default updateUserHandler;
