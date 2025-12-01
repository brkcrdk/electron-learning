import { ReactNode } from 'react';

import { useSortable } from '@dnd-kit/sortable';
import { SortDirection } from '@tanstack/react-table';

import Icon from '@/components/ui/Icon';

import { SortingChangeStateProps } from '../../MainTable';

import Content from './Content';

interface Props {
  headerId: string;
  content: ReactNode;
  onSortingChange?: (e: SortingChangeStateProps) => void;
  columnIsSorted: false | SortDirection;
  isSortable: boolean;
}

function CellContent({ headerId, content, onSortingChange, columnIsSorted, isSortable }: Props) {
  const { attributes, listeners } = useSortable({ id: headerId });

  return (
    <>
      <button
        {...attributes}
        {...listeners}
        className="hidden group-data-draggable/th:block"
      >
        <Icon name="dragHandle" />
      </button>
      {isSortable ? (
        <button
          className="relative flex cursor-pointer items-center justify-start gap-2 text-sm font-bold text-gray-700 group-data-centered/th:w-full group-data-centered/th:justify-center"
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
      ) : (
        <div className="relative flex items-center justify-start gap-2 text-sm font-bold text-gray-700 group-data-centered/th:w-full group-data-centered/th:justify-center">
          <Content
            content={content}
            columnIsSorted={columnIsSorted}
          />
        </div>
      )}
    </>
  );
}
export default CellContent;
