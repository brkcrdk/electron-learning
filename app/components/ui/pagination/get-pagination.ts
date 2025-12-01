import { type PaginationProps } from '.';

type PageProps = number | 'end-boundry' | 'start-boundry';

function getPagination({ currentPage, totalPages, maxVisiblePages = 3 }: Pick<PaginationProps, 'currentPage' | 'maxVisiblePages' | 'totalPages'>): PageProps[] {
  const pagination: PageProps[] = [];
  const range = maxVisiblePages - 2; // Boundry elementlerini page olarak saymadığımız için 2 çıkartıyoruz.

  // Sayfa aralıklarının sınırları
  let start = Math.max(2, currentPage - Math.floor(range / 2));
  let end = Math.min(totalPages - 1, currentPage + Math.floor(range / 2));

  // Aralık sol veya sağdan sınıra dayanıyorsa, kaydırma işlemi yap
  if (currentPage <= Math.floor(range / 2)) {
    end = Math.min(totalPages - 1, range + 1);
  } else if (currentPage >= totalPages - Math.floor(range / 2)) {
    start = Math.max(2, totalPages - range);
  }

  pagination.push(1); // İlk sayfa

  if (start > 2) {
    pagination.push('start-boundry');
  }

  for (let i = start; i <= end; i++) {
    pagination.push(i);
  }

  if (end < totalPages - 1) {
    pagination.push('end-boundry');
  }

  pagination.push(totalPages); // Son sayfa

  return pagination;
}

export default getPagination;
