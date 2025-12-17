import { ipcMain } from 'electron';
import type { ApiResponseProps } from 'types/api-response-types';

import { getCurrentUser } from '@api/user-session';
import { getDb } from '@db/client';
import type { EducationAssignmentListItem } from '@db/schema';

function getAssigmentList() {
  ipcMain.handle('get-education-assignment-list', async (): ApiResponseProps<EducationAssignmentListItem[]> => {
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

      return {
        success: true,
        data: [],
      };
    } catch (error) {
      console.error('get education assignment list error', error);
      throw error;
    }
  });
}

export default getAssigmentList;
