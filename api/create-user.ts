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
        throw {
          success: false,
          error: 'Giriş yapmış kullanıcı bulunamadı.',
        };
      }
      if (currentUser.roles === 'user') {
        throw {
          success: false,
          error: 'Bu işlemi yapmak için yetkiniz yok.',
        };
      }

      await db.insert(users).values(data);

      return {
        success: true,
        data: 'Kullanıcı oluşturuldu.',
      };
    } catch (error) {
      console.error('create user error', error);
      throw {
        success: false,
        error: 'Kullanıcı oluşturulurken bir hata gerçekleşti.',
      };
    }
  });
}

export default createUserHandler;
