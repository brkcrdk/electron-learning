import { ipcMain } from 'electron';

import { getCurrentUser } from './user-session';

import type { User } from '../db/schema';
import type { ApiResponseProps } from '../types/api-response-types';

function getCurrentUserHandler() {
  ipcMain.handle('get-current-user', async (): ApiResponseProps<User> => {
    try {
      const currentUser = getCurrentUser();

      if (!currentUser) {
        return {
          success: false,
          error: 'Giriş yapmış kullanıcı bulunamadı.',
        };
      }

      return {
        success: true,
        data: currentUser,
      };
    } catch (error) {
      console.error(error);
      throw {
        success: false,
        error: 'Giriş yapmış kullanıcı bulunamadı.',
      };
    }
  });
}

export default getCurrentUserHandler;
