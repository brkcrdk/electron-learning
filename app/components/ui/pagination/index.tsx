import type { HTMLAttributes } from 'react';

import cd from '@app/utils/cd';
import cn from '@app/utils/cn';

import getPagination from './get-pagination';
import Icon from '../icon';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  maxVisiblePages?: number;
  onPageChange: (page: number) => void;
  rootProps?: HTMLAttributes<HTMLUListElement>;
  disabled?: boolean;
}

const sharedButtonClassName = 'btn aria-disabled:btn-disabled btn-square data-selected:btn-neutral';

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
          className={sharedButtonClassName}
          aria-disabled={currentPage === 1 || disabled}
          disabled={disabled}
        >
          <Icon
            name="arrow-left"
            className="size-4"
          />
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
                className={sharedButtonClassName}
              >
                {item}
              </button>
            ) : (
              <button
                disabled={disabled}
                aria-disabled={disabled}
                className={sharedButtonClassName}
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
          className={sharedButtonClassName}
          aria-disabled={currentPage === totalPages || disabled}
          disabled={disabled}
        >
          <Icon
            name="arrow-right"
            className="size-4"
          />
        </button>
      </li>
    </ul>
  );
}

export default Pagination;
