import { desc } from 'drizzle-orm';
import { ipcMain } from 'electron';

import { getDb } from '@db/client';
import { categories, type CategoryWithChildren } from '@db/schema';

import type { ApiResponseProps } from '../../types/api-response-types';
import { getCurrentUser } from '../user-session';
import buildCategoryTree from './build-category-tree';

function getCategoryList() {
  ipcMain.handle('get-category-list', async (): ApiResponseProps<CategoryWithChildren[]> => {
    try {
      const db = getDb();

      const currentUser = getCurrentUser();

      if (!currentUser) {
        return {
          success: false,
          error: 'Giriş yapmış kullanıcı bulunamadı.',
        };
      }

      const categoryRows = await db.select().from(categories).orderBy(desc(categories.createdAt));

      const categoryTree = buildCategoryTree(categoryRows);

      return {
        success: true,
        data: categoryTree,
      };
    } catch (error) {
      console.error('get category list error', error);
      throw error;
    }
  });
}

export default getCategoryList;
