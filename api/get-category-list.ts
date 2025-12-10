import { desc } from 'drizzle-orm';
import { ipcMain } from 'electron';

import { db } from '@db/client';
import { category, type Category } from '@db/schema';

import { getCurrentUser } from './user-session';
import type { ApiResponseProps } from '../types/api-response-types';

function getCategoryListHandler() {
  ipcMain.handle('get-category-list', async (): ApiResponseProps<Category[]> => {
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

      const categoryList = await db.select().from(category).orderBy(desc(category.createdAt));

      return {
        success: true,
        data: categoryList,
      };
    } catch (error) {
      console.error('get category list error', error);
      throw error;
    }
  });
}

export default getCategoryListHandler;
