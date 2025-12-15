import { eq } from 'drizzle-orm';
import { ipcMain } from 'electron';
import type { ApiResponseProps } from 'types/api-response-types';

import { getDb } from '@db/client';
import { categories, type MutateCategoryPayload } from '@db/schema';

import { getCurrentUser } from '../user-session';

function createCategory() {
  ipcMain.handle('create-category', async (_, data: MutateCategoryPayload): ApiResponseProps<string> => {
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

      const hasCategoryWithSameSlug = await db.query.categories.findFirst({
        where: eq(categories.slug, data.slug),
      });

      if (hasCategoryWithSameSlug) {
        return {
          success: false,
          error: 'Bu slug ile zaten bir kategori var.',
        };
      }

      await db.insert(categories).values({
        ...data,
        createdBy: currentUser.id,
      });

      return {
        success: true,
        data: 'Kategori oluşturuldu.',
      };
    } catch (error) {
      console.error('create category error', error);
      throw error;
    }
  });
}

export default createCategory;
