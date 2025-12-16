import { asc, desc, type SQL } from 'drizzle-orm';
import type { SQLiteColumn } from 'drizzle-orm/sqlite-core';

import type { PaginatedData, PaginationParams, SortColumn } from '../../types/api-response-types';

/**
 * Pagination için default değerler
 */
export const DEFAULT_PAGE = 1;
export const DEFAULT_LIMIT = 10;

/**
 * PaginationParams için default değerleri döndürür
 */
export function getPaginationDefaults(): Required<Pick<PaginationParams, 'page' | 'limit'>> {
  return {
    page: DEFAULT_PAGE,
    limit: DEFAULT_LIMIT,
  };
}

/**
 * Normalize edilmiş pagination parametrelerini döndürür
 */
export function normalizePaginationParams(params: PaginationParams = {}): Required<Pick<PaginationParams, 'page' | 'limit'>> & { offset: number } {
  const defaults = getPaginationDefaults();
  const page = params.page ?? defaults.page;
  const limit = params.limit ?? defaults.limit;
  return {
    page,
    limit,
    offset: (page - 1) * limit,
  };
}

/**
 * Query builder'a limit ve offset ekler
 *
 * @param queryBuilder - Drizzle query builder
 * @param page - Sayfa numarası (1'den başlar)
 * @param limit - Sayfa başına kayıt sayısı
 * @returns Query builder'ın kendisi (method chaining için)
 */
export function applyPagination<
  TQueryBuilder extends {
    limit: (value: number) => TQueryBuilder;
    offset: (value: number) => TQueryBuilder;
  },
>(queryBuilder: TQueryBuilder, page: number, limit: number): TQueryBuilder {
  const offset = (page - 1) * limit;
  return queryBuilder.limit(limit).offset(offset);
}

/**
 * Sort column array'ini Drizzle orderBy clause'una çevirir
 *
 * @param sortColumns - Sort column array'i
 * @returns Drizzle orderBy array'i
 */
export function buildOrderByClause<TColumn extends SQLiteColumn>(sortColumns: SortColumn<TColumn>[] | undefined): SQL[] {
  if (!sortColumns || sortColumns.length === 0) {
    return [];
  }

  return sortColumns.map(sort => {
    if (sort.direction === 'asc') {
      return asc(sort.column);
    }
    return desc(sort.column);
  });
}

/**
 * Toplam kayıt sayısını hesaplar
 * Count query için ayrı bir builder oluşturulmalı (aynı where koşulları ile)
 *
 * @param countQuery - Count için hazırlanmış query (where, join'ler vb. içermeli)
 * @returns Toplam kayıt sayısı
 */
export async function getCount<
  TCountQuery extends {
    then: <TResult1 = { count: number }[], TResult2 = never>(
      onfulfilled?: ((value: { count: number }[]) => TResult1 | PromiseLike<TResult1>) | null,
      onrejected?: ((reason: unknown) => TResult2 | PromiseLike<TResult2>) | null
    ) => Promise<TResult1 | TResult2>;
  },
>(countQuery: TCountQuery): Promise<number> {
  const result = await countQuery;

  // Drizzle count query sonucu array döndürür: [{ count: number }]
  if (Array.isArray(result) && result.length > 0 && typeof result[0] === 'object' && 'count' in result[0]) {
    return result[0].count;
  }

  // Eğer direkt number döndürülüyorsa
  if (typeof result === 'number') {
    return result;
  }

  throw new Error('Count query beklenen formatta sonuç döndürmedi');
}

/**
 * Paginated response formatını oluşturur
 *
 * @param items - Sayfalanmış kayıtlar
 * @param total - Toplam kayıt sayısı
 * @param page - Mevcut sayfa numarası
 * @param limit - Sayfa başına kayıt sayısı
 * @returns PaginatedData formatında response
 */
export function buildPaginatedResponse<T>(items: T[], total: number, page: number, limit: number): PaginatedData<T> {
  return {
    items,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}
