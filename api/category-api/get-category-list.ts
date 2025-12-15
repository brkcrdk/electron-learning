import { desc, getTableColumns } from 'drizzle-orm';
import { ipcMain } from 'electron';

import hasChildrenColumn from '@api/utils/hasChildrenColumn';
import { getDb } from '@db/client';
import { categories, type Category } from '@db/schema';

import type { ApiResponseProps } from '../../types/api-response-types';
import { getCurrentUser } from '../user-session';

function getCategoryList() {
  ipcMain.handle('get-category-list', async (): ApiResponseProps<Category[]> => {
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

      /**
       * Tüm kategorileri getirirken her bir kategorinin alt kategorisi (children) olup olmadığını
       * kontrol ediyoruz ve bu bilgiyi `hasChildren` boolean değeri olarak döndürüyoruz.
       *
       * NOT: Bu değer veritabanında saklanmaz, her sorgu sırasında hesaplanır.
       *
       * Performans notları:
       * - EXISTS kullanımı: COUNT yerine EXISTS kullanıyoruz çünkü ilk eşleşmeyi bulunca durur,
       *   tüm kayıtları saymaz. Bu daha performanslıdır.
       * - Correlated subquery: Her kategori için, o kategorinin id'sine parentId olarak sahip
       *   başka bir kategori var mı kontrol eder.
       * - Index kullanımı: parentId üzerindeki index (idx_category_parent_id) bu sorguyu hızlandırır.
       * - mapWith(Boolean): SQLite boolean tipi desteklemediği için EXISTS sonucu integer (0/1)
       *   olarak döner. mapWith(Boolean) ile bu değeri JavaScript boolean'ına çeviriyoruz.
       */
      const categoryList = await db
        .select({
          // Tüm kategori kolonlarını getir (id, name, slug, description, parentId, createdAt, updatedAt)
          ...getTableColumns(categories),
          hasChildren: hasChildrenColumn(categories),
        })
        .from(categories)
        .orderBy(desc(categories.createdAt));

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

export default getCategoryList;
