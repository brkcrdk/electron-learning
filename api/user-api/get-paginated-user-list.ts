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

      // Eğer kullanıcı super-admin değilse, super-admin rolündeki kullanıcıları filtrele
      if (currentUser.role !== 'super-admin') {
        const whereCondition = ne(users.role, 'super-admin');

        // Data query ve count query'yi paralel çalıştır
        const [userList, countResult] = await Promise.all([
          db.select().from(users).where(whereCondition).orderBy(desc(users.createdAt)).limit(limit).offset(offset),
          getCount(db.select({ count: count() }).from(users).where(whereCondition)),
        ]);

        const paginatedResponse = buildPaginatedResponse(userList, countResult, page, limit);

        return {
          success: true,
          data: paginatedResponse,
        };
      }

      // Super-admin için tüm kullanıcıları getir
      const [userList, countResult] = await Promise.all([
        db.select().from(users).orderBy(desc(users.createdAt)).limit(limit).offset(offset),
        getCount(db.select({ count: count() }).from(users)),
      ]);

      const paginatedResponse = buildPaginatedResponse(userList, countResult, page, limit);

      return {
        success: true,
        data: paginatedResponse,
      };
    } catch (error) {
      console.error('get user list error', error);
      throw error;
    }
  });
}
export default getPaginatedUserList;
