import { eq, sql } from 'drizzle-orm';
import { ipcMain } from 'electron';

import { getDb } from '@db/client';
import { users, type NewUserPayload } from '@db/schema';

import { getCurrentUser } from './user-session';
import type { ApiResponseProps } from '../types/api-response-types';

function updateUserHandler() {
  ipcMain.handle('update-user', async (_, data: NewUserPayload): ApiResponseProps<string> => {
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

      if (currentUser.role !== 'super-admin' && data.role === 'super-admin') {
        return {
          success: false,
          error: 'Super admin rolünü değiştiremezsiniz.',
        };
      }

      if (data.id) {
        await db
          .update(users)
          .set({
            ...data,
            updatedAt: sql`(unixepoch())`,
          })
          .where(eq(users.id, data.id));
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
