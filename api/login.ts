import { ipcMain } from 'electron';

import { db } from '../db/client';
import { type User, users } from '../db/schema';

import type { ApiResponseProps } from '../types/api-response-types';

export interface LoginPayload {
  email: string;
  password: string;
}

function loginHandler() {
  ipcMain.handle('login', async (_, data: LoginPayload): ApiResponseProps<User> => {
    try {
      return {
        success: false,
        error: 'Giriş yapılırken bir hata gerçekleşti.',
      };
    } catch (error) {
      console.error('Failed to login', error);
      throw error instanceof Error ? error : new Error('Unknown error');
    }
  });
}

export default loginHandler;
