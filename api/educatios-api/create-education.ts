import { ipcMain } from 'electron';
import type { ApiResponseProps } from 'types/api-response-types';

import { getCurrentUser } from '@api/user-session';
import { getDb } from '@db/client';
import { educations, type CreateEducationPayload } from '@db/schema';

function createEducation() {
  ipcMain.handle('create-education', async (_, data: CreateEducationPayload): ApiResponseProps<string> => {
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

      await db.insert(educations).values({
        ...data,
        createdBy: currentUser.id,
      });

      return {
        success: true,
        data: 'Eğitim oluşturuldu.',
      };
    } catch (error) {
      console.error('create education error', error);
      throw error;
    }
  });
}

export default createEducation;
