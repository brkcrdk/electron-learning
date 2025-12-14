import { ipcMain } from 'electron';

import type { ApiResponseProps } from '../../types/api-response-types';
import { clearCurrentUser } from '../user-session';

function logoutHandler() {
  ipcMain.handle('logout', async (): ApiResponseProps<string> => {
    try {
      clearCurrentUser();

      return {
        success: true,
        data: 'Çıkış yapıldı.',
      };
    } catch (error) {
      console.error('logout error', error);
      throw error;
    }
  });
}

export default logoutHandler;
