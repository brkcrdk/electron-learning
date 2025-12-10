import { eq } from 'drizzle-orm';
import { ipcMain } from 'electron';
import type { ApiResponseProps } from 'types/api-response-types';

import { db } from '@db/client';
import { category, type NewCategoryPayload } from '@db/schema';

import { getCurrentUser } from './user-session';

function createCategoryHandler() {
  ipcMain.handle('create-category', async (_, data: NewCategoryPayload): ApiResponseProps<string> => {
    try {
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

      const hasCategoryWithSameSlug = await db.query.category.findFirst({
        where: eq(category.slug, data.slug),
      });

      if (hasCategoryWithSameSlug) {
        return {
          success: false,
          error: 'Bu slug ile zaten bir kategori var.',
        };
      }

      await db.insert(category).values(data);

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

export default createCategoryHandler;
