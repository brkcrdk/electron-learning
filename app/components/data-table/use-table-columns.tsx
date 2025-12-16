import { useMemo } from 'react';

import type { ColumnDef, ColumnPinningState } from '@tanstack/react-table';

import type { RowSelectionProps } from './main-table';
import Checkbox from '../ui/checkbox';

interface Props<T> {
  rowSelectionProps: RowSelectionProps<T>;
  columns: ColumnDef<T>[];
  pinnedColumns?: string[];
}

function useTableColumns<T>({ rowSelectionProps, columns, pinnedColumns }: Props<T>) {
  const { enableRowSelection } = rowSelectionProps;

  const computedColumns = useMemo(() => {
    return enableRowSelection
      ? [
          {
            accessorKey: 'select',
            id: 'select',
            enableSorting: false,
            size: 30,
            enableResizing: false,
            enablePinning: true,
            meta: { centeredColumn: false },
            header: ({ table }) => {
              const computedCheckedState = table.getIsSomeRowsSelected() ? 'indeterminate' : table.getIsAllRowsSelected();
              return (
                <Checkbox
                  className="border-accent-foreground/50"
                  checked={computedCheckedState}
                  onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
                />
              );
            },
            cell: ({ row }) => (
              <Checkbox
                checked={row.getIsSelected()}
                disabled={!row.getCanSelect()}
                onCheckedChange={row.getToggleSelectedHandler()}
              />
            ),
          },
          ...columns,
        ]
      : columns;
  }, [enableRowSelection, columns]);

  const computedPinnedColumns: string[] = pinnedColumns ? ['select', ...pinnedColumns] : ['select'];
  const computedColumnPinning: ColumnPinningState['left'] = enableRowSelection ? computedPinnedColumns : pinnedColumns;

  return {
    computedColumns,
    computedColumnPinning,
  };
}

export default useTableColumns;
