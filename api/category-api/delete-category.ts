import { eq } from 'drizzle-orm';
import { ipcMain } from 'electron';

import { getDb } from '@db/client';
import { category, type Category } from '@db/schema';

import type { ApiResponseProps } from '../../types/api-response-types';
import { getCurrentUser } from '../user-session';

function deleteCategory() {
  ipcMain.handle('delete-category', async (_, categoryId: Category['id']): ApiResponseProps<string> => {
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

      await db.delete(category).where(eq(category.id, categoryId));

      return {
        success: true,
        data: 'Kategori silindi.',
      };
    } catch (error) {
      console.error('delete category error', error);
      throw error;
    }
  });
}

export default deleteCategory;
