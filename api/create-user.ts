import { ipcMain } from 'electron';

import { db } from '../db/client';
import { users, type NewUserPayload } from '../db/schema';

import type { ApiResponseProps } from '../types/api-response-types';

export interface CreateUserData {
  email: string;
  name: string;
}

function createUserHandler() {
  ipcMain.handle('create-user', async (_, data: NewUserPayload): ApiResponseProps<string> => {
    try {
      await db.insert(users).values(data);

      return {
        success: true,
        data: 'Kullanıcı oluşturuldu.',
      };
    } catch (error) {
      console.error(error);
      throw {
        success: false,
        error: 'Kullanıcı oluşturulurken bir hata gerçekleşti.',
      };
    }
  });
}

export default createUserHandler;
