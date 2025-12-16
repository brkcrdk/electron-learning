import { count, desc, ne } from 'drizzle-orm';
import { ipcMain } from 'electron';

import { getDb } from '@db/client';
import { users, type User } from '@db/schema';

import type { ApiResponseProps, PaginatedData, PaginationParams } from '../../types/api-response-types';
import { getCurrentUser } from '../user-session';
import { buildPaginatedResponse, getCount, normalizePaginationParams } from '../utils/pagination';

function getPaginatedUserList() {
  ipcMain.handle('get-paginated-user-list', async (_, params: PaginationParams = {}): ApiResponseProps<PaginatedData<User>> => {
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

      const { page, limit, offset } = normalizePaginationParams(params);

      // Where condition'ı role'e göre belirle
      const whereCondition = currentUser.role !== 'super-admin' ? ne(users.role, 'super-admin') : undefined;

      // Data query ve count query'yi paralel çalıştır
      const dataQuery = db.select().from(users).orderBy(desc(users.createdAt)).limit(limit).offset(offset);

      const countQuery = db.select({ count: count() }).from(users);

      // Where condition varsa her iki query'ye de ekle
      const [userList, countResult] = await Promise.all([
        whereCondition ? dataQuery.where(whereCondition) : dataQuery,
        whereCondition ? getCount(countQuery.where(whereCondition)) : getCount(countQuery),
      ]);

      const paginatedResponse = buildPaginatedResponse(userList, countResult, page, limit);

      return {
        success: true,
        data: paginatedResponse,
      };
    } catch (error) {
      console.error('get-paginated-user-list error:', error);
      return {
        success: false,
        error:
          error instanceof Error ? `Kullanıcı listesi alınırken bir hata oluştu: ${error.message}` : 'Kullanıcı listesi alınırken beklenmeyen bir hata oluştu.',
      };
    }
  });
}
export default getPaginatedUserList;
