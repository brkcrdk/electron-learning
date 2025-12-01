import getPagination from './get-pagination';
import cd from '../../../utils/cd';
import cn from '../../../utils/cn';
import Icon from '../icon';

import type { HTMLAttributes } from 'react';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  maxVisiblePages?: number;
  onPageChange: (page: number) => void;
  rootProps?: HTMLAttributes<HTMLUListElement>;
  disabled?: boolean;
}

function Pagination({ totalPages, currentPage, maxVisiblePages = 4, onPageChange, rootProps, disabled = false }: PaginationProps) {
  const paginationItems = getPagination({ totalPages, currentPage, maxVisiblePages });

  if (totalPages <= 1) return null;

  return (
    <ul
      aria-disabled={disabled}
      {...rootProps}
      className={cn('flex items-center gap-2', rootProps?.className)}
    >
      <li className="contents">
        <button
          className="btn btn-circle aria-disabled:btn-disabled"
          aria-disabled={currentPage === 1 || disabled}
          disabled={disabled}
        >
          <Icon name="arrow-left" />
        </button>
      </li>
      {paginationItems.map((item, index) => {
        return (
          <li
            key={`pagination-${index}`}
            className="contents"
          >
            {typeof item === 'number' ? (
              <button
                aria-disabled={disabled}
                disabled={disabled}
                onClick={() => onPageChange(item)}
                data-selected={cd(currentPage === item)}
                className="btn btn-circle aria-disabled:btn-disabled data-selected:btn-neutral"
              >
                {item}
              </button>
            ) : (
              <button
                disabled={disabled}
                aria-disabled={disabled}
                className="btn btn-circle aria-disabled:btn-disabled"
                onClick={() => {
                  if (item === 'start-boundry') {
                    onPageChange(currentPage - maxVisiblePages);
                  } else if (item === 'end-boundry') {
                    onPageChange(currentPage + maxVisiblePages);
                  }
                }}
              >
                ...
              </button>
            )}
          </li>
        );
      })}
      <li className="contents">
        <button
          className="btn btn-circle aria-disabled:btn-disabled"
          aria-disabled={currentPage === totalPages || disabled}
          disabled={disabled}
        >
          <Icon name="arrow-right" />
        </button>
      </li>
    </ul>
  );
}

export default Pagination;
