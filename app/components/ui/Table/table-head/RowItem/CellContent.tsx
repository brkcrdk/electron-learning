import { type ReactNode } from 'react';

import { type SortDirection } from '@tanstack/react-table';

import cn from '@app/utils/cn';

import Content from './Content';
import type { SortingChangeStateProps } from '../../main-table';

interface Props {
  headerId: string;
  content: ReactNode;
  onSortingChange?: (e: SortingChangeStateProps) => void;
  columnIsSorted: false | SortDirection;
  isSortable: boolean;
}

const sharedClassName = cn(
  'relative flex items-center justify-start gap-2 text-sm font-normal',
  'group-data-centered/th:w-full group-data-centered/th:justify-center'
);

function CellContent({ headerId, content, onSortingChange, columnIsSorted, isSortable }: Props) {
  if (isSortable) {
    return (
      <button
        className={cn(sharedClassName, 'cursor-pointer')}
        onClick={() => {
          if (onSortingChange) {
            const sortingDirectionOrder = ['asc', 'desc', false];
            const currentIndex = sortingDirectionOrder.indexOf(columnIsSorted);
            const nextDirection = sortingDirectionOrder[currentIndex + 1] ?? sortingDirectionOrder[0];
            onSortingChange({ id: headerId, direction: nextDirection as SortDirection });
          }
        }}
        aria-label={`Sort ${headerId}`}
      >
        <Content
          content={content}
          columnIsSorted={columnIsSorted}
        />
      </button>
    );
  }

  return (
    <div className={sharedClassName}>
      <Content
        content={content}
        columnIsSorted={columnIsSorted}
      />
    </div>
  );
}
export default CellContent;
