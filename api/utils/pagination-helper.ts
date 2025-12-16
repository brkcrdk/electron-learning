import { and, asc, count, desc, like, or, type SQL, type Column } from 'drizzle-orm';
import type { BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';
import type { SQLiteTable } from 'drizzle-orm/sqlite-core';

import type { PaginationParams, SortColumn } from '../../types/api-response-types';

type Database = BetterSQLite3Database<Record<string, never>>;

/**
 * Pagination, search ve sort işlemlerini yöneten utility fonksiyonları
 */

/**
 * Offset değerini hesaplar
 */
export function calculateOffset(page: number, limit: number): number {
  return (page - 1) * limit;
}

/**
 * Search kelimesi için LIKE filtreleri oluşturur
 * Birden fazla kolonda arama yapar (OR mantığı ile)
 */
export function buildSearchFilter<T extends Column>(search: string | undefined, columns: T[]): SQL | undefined {
  if (!search || !search.trim() || columns.length === 0) {
    return undefined;
  }

  const searchTerm = `%${search.trim()}%`;
  const conditions = columns.map(column => like(column, searchTerm));

  return or(...conditions) || undefined;
}

/**
 * Sort kolonları için orderBy ifadesi oluşturur
 */
export function buildSortOrder<TColumn extends Column>(
  sortColumns: SortColumn<TColumn>[] | undefined,
  defaultSort?: SortColumn<TColumn>
): Array<ReturnType<typeof asc> | ReturnType<typeof desc>> {
  if (sortColumns && sortColumns.length > 0) {
    return sortColumns.map(({ column, direction }) => (direction === 'asc' ? asc(column) : desc(column)));
  }

  if (defaultSort) {
    return [defaultSort.direction === 'asc' ? asc(defaultSort.column) : desc(defaultSort.column)];
  }

  return [];
}

/**
 * Pagination parametrelerini normalize eder (default değerlerle)
 */
export function normalizePaginationParams(params: PaginationParams = {}) {
  return {
    page: params.page ?? 1,
    limit: params.limit ?? 10,
    search: params.search,
    sort: params.sort,
  };
}

/**
 * Where koşullarını birleştirir
 */
export function buildWhereClause(...conditions: (SQL | undefined)[]): SQL | undefined {
  const validConditions = conditions.filter((condition): condition is SQL => condition !== undefined);
  return validConditions.length > 0 ? and(...validConditions) : undefined;
}

/**
 * Paginated query builder seçenekleri
 */
export interface BuildPaginatedQueryOptions<TColumn extends Column> {
  params?: PaginationParams;
  searchColumns?: TColumn[]; // Arama yapılacak kolonlar
  defaultSort?: SortColumn<TColumn>; // Varsayılan sıralama
  additionalWhere?: SQL; // Ek where koşulları (örn: role filtreleme)
}

/**
 * Paginated query için gerekli bilgileri döndürür
 * Query'yi manuel olarak oluşturmanız gerekiyor
 */
export function getPaginationHelpers<TColumn extends Column>(options: BuildPaginatedQueryOptions<TColumn> = {}) {
  const { params = {}, searchColumns = [], defaultSort, additionalWhere } = options;

  const normalizedParams = normalizePaginationParams(params);
  const { page, limit, search, sort } = normalizedParams;

  // Search filtresi oluştur
  const searchFilter = buildSearchFilter(search, searchColumns);

  // Where koşullarını birleştir
  const whereClause = buildWhereClause(additionalWhere, searchFilter);

  // Sort order oluştur - sort tipini düzelt
  const sortColumns = sort as SortColumn<TColumn>[] | undefined;
  const orderByClauses = buildSortOrder(sortColumns, defaultSort);

  // Offset hesapla
  const offset = calculateOffset(page, limit);

  return {
    whereClause,
    orderByClauses,
    limit,
    offset,
    page,
    normalizedParams,
  };
}

/**
 * Count query için toplam kayıt sayısını döndürür
 */
export async function getTotalCount(
  db: Database,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  table: SQLiteTable<any>,
  whereClause?: SQL
): Promise<number> {
  const baseQuery = db.select({ count: count() }).from(table);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const countQuery = whereClause ? baseQuery.where(whereClause) : (baseQuery as any);
  const result = await countQuery;
  return result[0]?.count ?? 0;
}
