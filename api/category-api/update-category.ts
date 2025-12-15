import { eq, sql } from 'drizzle-orm';
import { ipcMain } from 'electron';
import type { ApiResponseProps } from 'types/api-response-types';

import { getDb } from '@db/client';
import { categories, type NewCategoryPayload } from '@db/schema';

import { getCurrentUser } from '../user-session';

function updateCategory() {
  ipcMain.handle('update-category', async (_, data: NewCategoryPayload): ApiResponseProps<string> => {
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
          error: 'Kategori ID bulunamadı.',
        };
      }

      await db
        .update(categories)
        .set({
          ...data,
          updatedAt: sql`(unixepoch())`,
        })
        .where(eq(categories.id, data.id));

      return {
        success: true,
        data: 'Kategori güncellendi.',
      };
    } catch (error) {
      console.error('update category error', error);
      throw error;
    }
  });
}

export default updateCategory;
