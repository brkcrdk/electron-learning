import { eq } from 'drizzle-orm';
import { ipcMain } from 'electron';

import { getDb } from '@db/client';
import { userEducationFavorites } from '@db/schema';

import type { ApiResponseProps } from '../../types/api-response-types';
import { getCurrentUser } from '../user-session';

function addToFavorites() {
  ipcMain.handle('add-to-favorites', async (_, educationId: number): ApiResponseProps<string> => {
    try {
      const db = getDb();

      const currentUser = getCurrentUser();

      if (!currentUser) {
        return {
          success: false,
          error: 'Giriş yapmış kullanıcı bulunamadı.',
        };
      }

      // Favori zaten var mı kontrol et
      const existingFavorite = await db.query.userEducationFavorites.findFirst({
        where: (favorites, { and }) => and(eq(favorites.userId, currentUser.id), eq(favorites.educationId, educationId)),
      });

      if (existingFavorite) {
        return {
          success: false,
          error: 'Bu eğitim zaten favorilerinizde.',
        };
      }

      // Favoriye ekle
      await db.insert(userEducationFavorites).values({
        userId: currentUser.id,
        educationId,
      });

      return {
        success: true,
        data: 'Eğitim favorilerinize eklendi.',
      };
    } catch (error) {
      console.error('add to favorites error', error);
      throw error;
    }
  });
}

export default addToFavorites;
