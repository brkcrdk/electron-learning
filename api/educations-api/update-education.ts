import { eq, sql } from 'drizzle-orm';
import { ipcMain } from 'electron';
import type { ApiResponseProps } from 'types/api-response-types';

import { getDb } from '@db/client';
import { educations, type CreateEducationPayload } from '@db/schema';

import { getCurrentUser } from '../user-session';

function updateEducation() {
  ipcMain.handle('update-education', async (_, data: CreateEducationPayload): ApiResponseProps<string> => {
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

      if (!data.id) {
        return {
          success: false,
          error: 'Eğitim ID bulunamadı.',
        };
      }

      await db
        .update(educations)
        .set({
          ...data,
          updatedAt: sql`(unixepoch())`,
        })
        .where(eq(educations.id, data.id));

      return {
        success: true,
        data: 'Eğitim güncellendi.',
      };
    } catch (error) {
      console.error('update education error', error);
      throw error;
    }
  });
}

export default updateEducation;
