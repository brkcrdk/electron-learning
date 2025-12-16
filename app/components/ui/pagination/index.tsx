import { useMemo, useCallback } from 'react';

import cd from '@app/utils/cd';
import cn from '@app/utils/cn';

import Button from '../button';
import getPagination from './get-pagination';
import Icon from '../icon';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  maxVisiblePages?: number;
  onPageChange: (page: number) => void;
  disabled?: boolean;
}

function Pagination({ totalPages, currentPage, maxVisiblePages = 4, onPageChange, disabled = false }: PaginationProps) {
  const paginationItems = useMemo(() => {
    return getPagination({ totalPages, currentPage, maxVisiblePages });
  }, [totalPages, currentPage, maxVisiblePages]);

  const handlePageChange = useCallback(
    (page: number) => {
      onPageChange(page);
    },
    [onPageChange]
  );

  if (totalPages <= 1) return null;

  return (
    <ul
      data-disabled={cd(disabled)}
      className={cn('data-disabled:opacity-60 flex items-center gap-2')}
    >
      <li className="contents">
        <Button
          disabled={currentPage === 1 || disabled}
          onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
          variant="secondary"
        >
          <Icon
            name="chevron-left"
            className="size-4"
          />
        </Button>
      </li>
      {paginationItems.map((item, index) => {
        return (
          <li
            key={`pagination-${index}`}
            className="contents"
          >
            {typeof item === 'number' ? (
              <Button
                disabled={disabled}
                onClick={() => handlePageChange(item)}
                variant={currentPage === item ? 'default' : 'secondary'}
              >
                {item}
              </Button>
            ) : (
              <Button
                disabled={disabled}
                onClick={() => {
                  if (item === 'start-boundry') {
                    handlePageChange(currentPage - maxVisiblePages);
                  } else {
                    handlePageChange(currentPage + maxVisiblePages);
                  }
                }}
                variant="secondary"
              >
                ...
              </Button>
            )}
          </li>
        );
      })}
      <li className="contents">
        <Button
          onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages || disabled}
          variant="secondary"
        >
          <Icon
            name="chevron-right"
            className="size-4"
          />
        </Button>
      </li>
    </ul>
  );
}

export default Pagination;
