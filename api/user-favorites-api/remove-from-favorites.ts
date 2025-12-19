import { and, eq } from 'drizzle-orm';
import { ipcMain } from 'electron';

import { getDb } from '@db/client';
import { userEducationFavorites } from '@db/schema';

import type { ApiResponseProps } from '../../types/api-response-types';
import { getCurrentUser } from '../user-session';

function removeFromFavorites() {
  ipcMain.handle('remove-from-favorites', async (_, educationId: number): ApiResponseProps<string> => {
    try {
      const db = getDb();

      const currentUser = getCurrentUser();

      if (!currentUser) {
        return {
          success: false,
          error: 'Giriş yapmış kullanıcı bulunamadı.',
        };
      }

      // Favoriyi sil
      const result = await db
        .delete(userEducationFavorites)
        .where(and(eq(userEducationFavorites.userId, currentUser.id), eq(userEducationFavorites.educationId, educationId)))
        .returning();

      if (result.length === 0) {
        return {
          success: false,
          error: 'Bu eğitim favorilerinizde bulunamadı.',
        };
      }

      return {
        success: true,
        data: 'Eğitim favorilerinizden çıkarıldı.',
      };
    } catch (error) {
      console.error('remove from favorites error', error);
      throw error;
    }
  });
}

export default removeFromFavorites;
