import { eq } from 'drizzle-orm';
import { ipcMain } from 'electron';
import type { ApiResponseProps } from 'types/api-response-types';

import { getCurrentUser } from '@api/user-session';
import { getDb } from '@db/client';
import { educationAssignees, educations, type Education } from '@db/schema';

function deleteEducation() {
  ipcMain.handle('delete-education', async (_, educationId: Education['id']): ApiResponseProps<string> => {
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

      if (!educationId) {
        return {
          success: false,
          error: 'Eğitim ID bulunamadı.',
        };
      }

      db.transaction(tx => {
        tx.delete(educationAssignees).where(eq(educationAssignees.educationId, educationId)).run();
        tx.delete(educations).where(eq(educations.id, educationId)).run();
      });

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
