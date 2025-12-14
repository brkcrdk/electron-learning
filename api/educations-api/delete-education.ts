import { eq } from 'drizzle-orm';
import { ipcMain } from 'electron';

import { getDb } from '@db/client';
import { educations, type EducationListItem } from '@db/schema';

import type { ApiResponseProps } from '../../types/api-response-types';
import { getCurrentUser } from '../user-session';

function deleteEducation() {
  ipcMain.handle('delete-education', async (_, educationId: EducationListItem['id']): ApiResponseProps<string> => {
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

      await db.delete(educations).where(eq(educations.id, educationId));

      return {
        success: true,
        data: 'Eğitim silindi.',
      };
    } catch (error) {
      console.error('delete education error', error);
      throw error;
    }
  });
}

export default deleteEducation;
