type ApiResponseType<T> =
  | {
      success: true;
      data: T;
    }
  | {
      success: false;
      error: string;
    };

export type ApiResponseProps<T> = Promise<ApiResponseType<T>>;

export type SortDirection = 'asc' | 'desc';

export type SortColumn<T = unknown> = {
  column: T;
  direction: SortDirection;
};

export type PaginationParams = {
  page?: number; // 1'den başlayan sayfa numarası (opsiyonel, default: 1)
  limit?: number; // Sayfa başına kayıt sayısı (opsiyonel, default: 10)
  search?: string; // Arama kelimesi (opsiyonel)
  sort?: SortColumn[]; // Sıralama kolonları (opsiyonel, birden fazla kolon için)
};

export type PaginatedData<T> = {
  items: T[];
  pagination: {
    page: number;
    limit: number;
    total: number; // Toplam kayıt sayısı
    totalPages: number; // Toplam sayfa sayısı
  };
};
