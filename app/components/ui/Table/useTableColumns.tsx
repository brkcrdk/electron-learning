import { useMemo, useState } from 'react';

import { ColumnDef, ColumnOrderState, ColumnPinningState } from '@tanstack/react-table';

import Checkbox from '../Checkbox';

import { RowSelectionProps } from './MainTable';

interface Props<T> {
  rowSelectionProps: RowSelectionProps<T>;
  columns: ColumnDef<T>[];
  pinnedColumns?: string[];
}

function useTableColumns<T>({ rowSelectionProps, columns, pinnedColumns }: Props<T>) {
  const memoizedColumns = useMemo<ColumnDef<T>[]>(() => {
    if (rowSelectionProps.enableRowSelection) {
      return [
        {
          accessorKey: 'select',
          id: 'select',
          enableSorting: false,
          size: 30,
          enableResizing: false,
          enablePinning: true,
          meta: {
            centeredColumn: true,
          },
          header: ({ table }) => (
            <Checkbox
              itemType="defaultCheckboxItem"
              rootProps={{
                checked: table.getIsAllRowsSelected(),
                onClick: table.getToggleAllRowsSelectedHandler(),
              }}
            />
          ),
          cell: ({ row }) => (
            <Checkbox
              itemType="defaultCheckboxItem"
              rootProps={{
                checked: row.getIsSelected(),
                disabled: !row.getCanSelect(),
                onCheckedChange: row.getToggleSelectedHandler(),
              }}
            />
          ),
        },
        ...columns,
      ];
    } else {
      return columns;
    }
  }, []);

  const computedColumnPinning: ColumnPinningState['left'] = useMemo(() => {
    if (rowSelectionProps.enableRowSelection) {
      if (pinnedColumns) {
        return ['select', ...pinnedColumns];
      } else {
        return ['select'];
      }
    } else {
      return pinnedColumns;
    }
  }, []);

  const [columnOrder, setColumnOrder] = useState<ColumnOrderState>(memoizedColumns.map(column => String(column.id)));

  return {
    memoizedColumns,
    computedColumnPinning,
    columnOrder,
    setColumnOrder,
  };
}

export default useTableColumns;
