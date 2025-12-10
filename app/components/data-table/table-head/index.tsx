import { type Table as TableType } from '@tanstack/react-table';

import Table from '@app/components/ui/table';

import { type SortingChangeStateProps } from '../main-table';
import RowItem from './row-item';

interface Props<T> {
  table: TableType<T>;
  onSortingChange: (val: SortingChangeStateProps) => void;
}

function TableHead<T>({ table, onSortingChange }: Props<T>) {
  return (
    <Table.Header className="bg-accent">
      {table.getHeaderGroups().map(headerGroup => (
        <Table.Row key={headerGroup.id}>
          {headerGroup.headers.map(header => {
            return (
              <RowItem
                key={header.id}
                header={header}
                onSortingChange={onSortingChange}
              />
            );
          })}
        </Table.Row>
      ))}
    </Table.Header>
  );
}
export default TableHead;
