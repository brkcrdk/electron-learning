import type { Table } from '@tanstack/react-table';

import { type SortingChangeStateProps } from '../main-table';
import RowItem from './RowItem';

interface Props<T> {
  table: Table<T>;
  onSortingChange: (val: SortingChangeStateProps) => void;
}

function TableHead<T>({ table, onSortingChange }: Props<T>) {
  return (
    <thead>
      {table.getHeaderGroups().map(headerGroup => {
        return (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map(header => {
              return (
                <RowItem
                  key={header.id}
                  header={header}
                  onSortingChange={onSortingChange}
                />
              );
            })}
          </tr>
        );
      })}
    </thead>
  );
}
export default TableHead;
