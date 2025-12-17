import { ipcMain } from 'electron';
import type { ApiResponseProps } from 'types/api-response-types';

import { getCurrentUser } from '@api/user-session';
import { getDb } from '@db/client';

function createAssigment() {
  ipcMain.handle('create-education-assignment', async (): ApiResponseProps<string> => {
    try {
      const db = getDb();
      const currentUser = getCurrentUser();

      return {
        success: true,
        data: 'xx',
      };
    } catch (error) {
      console.error('create education assignment error', error);
      throw error;
    }
  });
}
export default createAssigment;
