import { eq } from 'drizzle-orm';
import { ipcMain } from 'electron';

import { db } from '@db/client';
import { users, type NewUserPayload } from '@db/schema';

import { getCurrentUser } from './user-session';
import type { ApiResponseProps } from '../types/api-response-types';

function createUserHandler() {
  ipcMain.handle('create-user', async (_, data: NewUserPayload): ApiResponseProps<string> => {
    try {
      const currentUser = getCurrentUser();

      if (!currentUser) {
        throw 'Giriş yapmış kullanıcı bulunamadı.';
      }
      if (currentUser.roles === 'user') {
        throw 'Bu işlemi yapmak için yetkiniz yok.';
      }

      const hasUserWithSameEmail = await db.query.users.findFirst({
        where: eq(users.email, data.email),
      });

      if (hasUserWithSameEmail) {
        throw 'Bu e-posta adresiyle zaten bir kullanıcı var.';
      }

      await db.insert(users).values(data);

      return {
        success: true,
        data: 'Kullanıcı oluşturuldu.',
      };
    } catch (error) {
      console.error('create user error', error);
      throw error;
    }
  });
}

export default createUserHandler;
