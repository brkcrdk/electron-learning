import { eq } from 'drizzle-orm';
import { ipcMain } from 'electron';
import type { ApiResponseProps } from 'types/api-response-types';

import { getCurrentUser } from '@api/user-session';
import { getDb } from '@db/client';
import { educationAssignments, type EducationAssignment } from '@db/schema';

function deleteAssigment() {
  ipcMain.handle('delete-education-assignment', async (_, assignmentId: EducationAssignment['id']): ApiResponseProps<string> => {
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

      if (!assignmentId) {
        return {
          success: false,
          error: 'Eğitim ataması ID bulunamadı.',
        };
      }

      await db.delete(educationAssignments).where(eq(educationAssignments.id, assignmentId));

      return {
        success: true,
        data: 'Eğitim ataması silindi.',
      };
    } catch (error) {
      console.error('delete education assignment error', error);
      throw error;
    }
  });
}

export default deleteAssigment;
