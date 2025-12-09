import { flexRender, type Table as TableType } from '@tanstack/react-table';

import Table from '@app/components/ui/table';

import { type SortingChangeStateProps } from '../main-table';
// import RowItem from './RowItem';

interface Props<T> {
  table: TableType<T>;
  onSortingChange: (val: SortingChangeStateProps) => void;
}

function TableHead<T>({ table, onSortingChange }: Props<T>) {
  return (
    <Table.Header>
      {table.getHeaderGroups().map(headerGroup => (
        <Table.Row key={headerGroup.id}>
          {headerGroup.headers.map(header => {
            return <Table.Head key={header.id}>{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}</Table.Head>;
          })}
        </Table.Row>
      ))}
    </Table.Header>
  );
}
export default TableHead;
