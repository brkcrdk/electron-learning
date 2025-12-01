import { type Header, flexRender } from '@tanstack/react-table';

import CellContent from './CellContent';
import cd from '../../../../../utils/cd';

import type { SortingChangeStateProps } from '../../main-table';

interface Props<T> {
  header: Header<T, unknown>;
  onSortingChange?: (e: SortingChangeStateProps) => void;
}

function RowItem<T>({ header, onSortingChange }: Props<T>) {
  const { meta } = header.column.columnDef;

  return (
    <th
      key={header.id}
      data-sortable={cd(header.column.getCanSort())}
      data-sorted={cd(header.column.getIsSorted())}
      data-centered={cd(meta?.centeredColumn)}
      // Tablomuzda sadece sola doğru sabitleme yaptığımız için left olup olmadığını kontrol ediyoruz.
      data-pinned={cd(header.column.getIsPinned() === 'left')}
      colSpan={header.colSpan}
      className="group/th"
    >
      <CellContent
        headerId={header.id}
        content={flexRender(header.column.columnDef.header, header.getContext())}
        onSortingChange={onSortingChange}
        columnIsSorted={header.column.getIsSorted()}
        isSortable={header.column.getCanSort()}
      />
    </th>
  );
}
export default RowItem;
