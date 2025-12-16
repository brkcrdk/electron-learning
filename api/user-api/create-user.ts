import { eq } from 'drizzle-orm';
import { ipcMain } from 'electron';

import { getDb } from '@db/client';
import { users, type MutateUserPayload } from '@db/schema';

import type { ApiResponseProps } from '../../types/api-response-types';
import { getCurrentUser } from '../user-session';

function createUser() {
  ipcMain.handle('create-user', async (_, data: MutateUserPayload): ApiResponseProps<string> => {
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

      const hasUserWithSameUsername = await db.query.users.findFirst({
        where: eq(users.username, data.username),
      });

      if (hasUserWithSameUsername) {
        return {
          success: false,
          error: 'Bu kullanıcı adıyla zaten bir kullanıcı var.',
        };
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

export default createUser;
