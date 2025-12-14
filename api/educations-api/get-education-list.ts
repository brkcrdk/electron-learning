import { desc } from 'drizzle-orm';
import { ipcMain } from 'electron';
import type { ApiResponseProps } from 'types/api-response-types';

import { getCurrentUser } from '@api/user-session';
import { getDb } from '@db/client';
import { educations, type Educations } from '@db/schema';

function getEducationList() {
  ipcMain.handle('get-education-list', async (): ApiResponseProps<Educations[]> => {
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

      const educationList = await db.select().from(educations).orderBy(desc(educations.createdAt));

      return {
        success: true,
        data: educationList,
      };
    } catch (error) {
      console.error('get education list error', error);
      throw error;
    }
  });
}

export default getEducationList;
