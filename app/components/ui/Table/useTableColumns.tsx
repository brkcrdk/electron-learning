import type { RowSelectionProps } from './main-table';
import type { ColumnDef, ColumnPinningState } from '@tanstack/react-table';

interface Props<T> {
  rowSelectionProps: RowSelectionProps<T>;
  columns: ColumnDef<T>[];
  pinnedColumns?: string[];
}

function useTableColumns<T>({ rowSelectionProps, columns, pinnedColumns }: Props<T>) {
  const { enableRowSelection } = rowSelectionProps;

  const memoizedColumns: ColumnDef<T>[] = enableRowSelection
    ? [
        {
          accessorKey: 'select',
          id: 'select',
          enableSorting: false,
          size: 30,
          enableResizing: false,
          enablePinning: true,
          meta: { centeredColumn: false },
          header: ({ table }) => (
            <input
              type="checkbox"
              defaultChecked={table.getIsAllRowsSelected()}
              onClick={table.getToggleAllRowsSelectedHandler()}
              className="checkbox"
            />
          ),
          cell: ({ row }) => (
            <input
              type="checkbox"
              defaultChecked={row.getIsSelected()}
              onClick={row.getToggleSelectedHandler()}
              disabled={!row.getCanSelect()}
              className="checkbox"
            />
          ),
        },
        ...columns,
      ]
    : columns;

  const computedPinnedColumns: string[] = pinnedColumns ? ['select', ...pinnedColumns] : ['select'];
  const computedColumnPinning: ColumnPinningState['left'] = enableRowSelection ? computedPinnedColumns : pinnedColumns;

  return {
    memoizedColumns,
    computedColumnPinning,
  };
}

export default useTableColumns;
