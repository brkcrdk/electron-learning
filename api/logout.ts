import { ipcMain } from 'electron';

import { clearCurrentUser } from './user-session';

import type { ApiResponseProps } from '../types/api-response-types';

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
      throw {
        success: false,
        error: 'Çıkış yapılırken bir hata gerçekleşti.',
      };
    }
  });
}

export default logoutHandler;
