import { ipcMain } from 'electron';

import type { User } from '@db/schema';

import { getCurrentUser } from './user-session';
import type { ApiResponseProps } from '../types/api-response-types';

function getCurrentUserHandler() {
  ipcMain.handle('get-current-user', async (): ApiResponseProps<User> => {
    console.log('current user requested');
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
      console.error('get current user error', error);
      throw error;
    }
  });
}

export default getCurrentUserHandler;
