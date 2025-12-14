import { ipcMain } from 'electron';

import type { User } from '@db/schema';

import type { ApiResponseProps } from '../../types/api-response-types';
import { getCurrentUser } from '../user-session';

function currentUser() {
  ipcMain.handle('current-user', async (): ApiResponseProps<User> => {
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

export default currentUser;
