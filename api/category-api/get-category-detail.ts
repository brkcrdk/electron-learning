import { eq } from 'drizzle-orm';
import { ipcMain } from 'electron';
import type { ApiResponseProps } from 'types/api-response-types';

import { getCurrentUser } from '@api/user-session';
import { getDb } from '@db/client';
import { categories, type Category } from '@db/schema';

function getCategoryDetail() {
  ipcMain.handle('get-category-detail', async (_, categoryId: Category['id']): ApiResponseProps<Category> => {
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

      const db = getDb();

      const category = await db.query.categories.findFirst({
        where: eq(categories.id, categoryId),
      });

      if (!category) {
        return {
          success: false,
          error: 'Kategori bulunamadı.',
        };
      }

      return {
        success: true,
        data: category,
      };
    } catch (error) {
      console.error('get category detail error', error);
      throw error;
    }
  });
}

export default getCategoryDetail;
