import { and, count, desc, eq, getTableColumns, ne } from 'drizzle-orm';
import { ipcMain } from 'electron';

import { getDb } from '@db/client';
import { userEducationFavorites, users, type UserListItem } from '@db/schema';

import type { ApiResponseProps, PaginatedData, PaginationParams } from '../../types/api-response-types';
import { getCurrentUser } from '../user-session';
import { buildPaginatedResponse, buildSearchCondition, getCount, normalizePaginationParams } from '../utils/pagination';

function getPaginatedUserList() {
  ipcMain.handle('get-paginated-user-list', async (_, params: PaginationParams = {}): ApiResponseProps<PaginatedData<UserListItem>> => {
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
      const roleCondition = currentUser.role !== 'super-admin' ? ne(users.role, 'super-admin') : undefined;

      // Search condition oluştur (name ve username kolonlarında ara)
      const searchCondition = buildSearchCondition(params.search, [users.name, users.username]);

      // Tüm condition'ları birleştir
      const whereCondition = and(roleCondition, searchCondition);

      // Favori sayılarını hesaplayan subquery
      const favoriteCounts = db
        .select({
          userId: userEducationFavorites.userId,
          favoriteCount: count(userEducationFavorites.id).as('favoriteCount'),
        })
        .from(userEducationFavorites)
        .groupBy(userEducationFavorites.userId)
        .as('favorite_counts');

      // Data query - favori sayıları ile birlikte
      const dataQuery = db
        .select({
          ...getTableColumns(users),
          favoriteCount: favoriteCounts.favoriteCount,
        })
        .from(users)
        .leftJoin(favoriteCounts, eq(users.id, favoriteCounts.userId))
        .orderBy(desc(users.createdAt))
        .limit(limit)
        .offset(offset);

      const countQuery = db.select({ count: count() }).from(users);

      // Where condition varsa her iki query'ye de ekle
      const [userList, countResult] = await Promise.all([
        whereCondition ? dataQuery.where(whereCondition) : dataQuery,
        whereCondition ? getCount(countQuery.where(whereCondition)) : getCount(countQuery),
      ]);

      // Favori sayısını number'a çevir (null ise 0)
      const userListWithFavoriteCount: UserListItem[] = userList.map(user => ({
        ...user,
        favoriteCount: user.favoriteCount ?? 0,
      }));

      const paginatedResponse = buildPaginatedResponse(userListWithFavoriteCount, countResult, page, limit);

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
