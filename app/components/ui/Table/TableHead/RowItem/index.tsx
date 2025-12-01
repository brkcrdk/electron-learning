import { CSSProperties } from 'react';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Header, flexRender } from '@tanstack/react-table';

import cd from '@/utils/cd';

import { SortingChangeStateProps } from '../../MainTable';

import CellContent from './CellContent';

interface Props<T> {
  header: Header<T, unknown>;
  onSortingChange?: (e: SortingChangeStateProps) => void;
}

function RowItem<T>({ header, onSortingChange }: Props<T>) {
  const { meta } = header.column.columnDef;

  const isDraggable = meta?.isDraggable;

  const { setNodeRef, transform, transition } = useSortable({ id: header.id });

  const style: CSSProperties = {
    transform: CSS.Translate.toString(transform),
    transition,
    width: header.getSize(),
    minWidth: header.getSize(),
    left: header.column.getIsPinned() === 'left' ? header.column.getStart('left') : undefined,
  };

  return (
    <th
      key={header.id}
      ref={isDraggable ? setNodeRef : null}
      style={style}
      data-sortable={cd(header.column.getCanSort())}
      data-sorted={cd(header.column.getIsSorted())}
      data-centered={cd(meta?.centeredColumn)}
      data-draggable={cd(meta?.isDraggable)}
      // Tablomuzda sadece sola doğru sabitleme yaptığımız için left olup olmadığını kontrol ediyoruz.
      data-pinned={cd(header.column.getIsPinned() === 'left')}
      colSpan={header.colSpan}
      className="group/th relative bg-white p-2 select-none data-pinned:sticky data-pinned:z-10 data-pinned:opacity-90"
    >
      <div className="relative py-4">
        <CellContent
          headerId={header.id}
          content={flexRender(header.column.columnDef.header, header.getContext())}
          onSortingChange={onSortingChange}
          columnIsSorted={header.column.getIsSorted()}
          isSortable={header.column.getCanSort()}
        />
      </div>
      {header.column.getCanResize() && (
        <div
          onMouseDown={header.getResizeHandler()}
          onTouchStart={header.getResizeHandler()}
          className="invisible absolute top-0 right-0 h-full w-1 cursor-col-resize bg-gray-500 group-hover/th:visible"
        />
      )}
    </th>
  );
}
export default RowItem;
