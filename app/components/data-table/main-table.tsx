import {
  getCoreRowModel,
  getExpandedRowModel,
  useReactTable,
  type ColumnDef,
  type OnChangeFn,
  type RowSelectionState,
  type SortDirection,
  type SortingState,
  type TableOptions,
} from '@tanstack/react-table';

// import TableFooter, { type TablePaginationProps } from './table-footer';
import cn from '@app/utils/cn';

import TableBody from './table-body';
import TableEmptyState, { type TableEmptyStateProps } from './table-empty-state';
import TableHead from './table-head';
import TableHeader from './table-header';
import type { TableActionsProps } from './table-header/table-actions';
import { type TableSearchProps } from './table-header/table-search-bar';
import useTableColumns from './use-table-columns';
import Table from '../ui/table';

export type RowSelectionProps<T> =
  | {
      enableRowSelection: false;
    }
  | {
      enableRowSelection: true;
      rowSelection: RowSelectionState;
      onRowSelectionChange: OnChangeFn<RowSelectionState>;
      /**
       * Eğer rowlar seçerken indexine göre değilde bizim belirteceğimiz row indexine göre
       * seçip ona göre saklarız
       * * **NOTE**: Bu değer uniq bir değeri ifade etmelidir.
       */
      getRowId?: (row: T) => string;
    };

export interface SortingChangeStateProps {
  id: string;
  direction: SortDirection | false;
}

interface SortingProps {
  sorting: SortingState;
  onSortingChange: (val: SortingChangeStateProps) => void;
}

export interface TableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  tableTitle?: string;
  searchProps?: TableSearchProps;
  tableActions?: TableActionsProps[];
  // paginationProps?: TablePaginationProps;
  sortingProps?: SortingProps;
  rowSelectionProps?: RowSelectionProps<T>;
  pinnedColumns?: string[];
  tableEmptyStateProps?: TableEmptyStateProps;
  isLoading?: boolean;
  isDisabled?: boolean;
  /**
   * TableOptions ile default tablo ayarlarını güncelleyebiliriz.
   * @see https://tanstack.com/table/latest/docs/api/core/TableOptions
   */
  tableOptions?: Omit<TableOptions<T>, 'data' | 'columns' | 'getCoreRowModel'>;
}

function MainTable<T>({
  columns,
  data,
  tableTitle,
  searchProps,
  tableActions,
  // paginationProps,
  isDisabled,
  tableEmptyStateProps,
  pinnedColumns,
  tableOptions,
  sortingProps = {
    sorting: [],
    onSortingChange: () => {},
  },
  rowSelectionProps = {
    enableRowSelection: true,
    rowSelection: {},
    onRowSelectionChange: () => {},
  },
}: TableProps<T>) {
  const { computedColumns, computedColumnPinning } = useTableColumns({
    columns,
    pinnedColumns,
    rowSelectionProps,
  });

  const table = useReactTable({
    data,
    columns: computedColumns,
    state: {
      sorting: sortingProps.sorting,
      rowSelection: rowSelectionProps.enableRowSelection ? rowSelectionProps.rowSelection : {},
      columnPinning: {
        left: computedColumnPinning,
      },
    },
    enableSorting: true,
    enableMultiSort: true,
    manualSorting: true,
    enableExpanding: true,
    enableRowSelection: rowSelectionProps.enableRowSelection,
    getRowId: rowSelectionProps.enableRowSelection ? rowSelectionProps.getRowId : undefined,
    onRowSelectionChange: rowSelectionProps.enableRowSelection ? rowSelectionProps.onRowSelectionChange : undefined,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    debugTable: import.meta.env.DEV,
    debugHeaders: import.meta.env.DEV,
    debugColumns: import.meta.env.DEV,
    ...tableOptions,
  });

  return (
    <div
      aria-disabled={isDisabled}
      className="group/table flex h-full flex-col gap-4 overflow-x-auto"
    >
      <TableHeader
        tableTitle={tableTitle}
        searchProps={searchProps}
        tableActions={tableActions}
      />

      <div className={cn('overflow-auto rounded-md border', isDisabled && 'pointer-events-none opacity-50')}>
        <Table containerClassName="h-full relative">
          <TableHead
            table={table}
            onSortingChange={sortingProps.onSortingChange}
          />
          {table.getRowModel().rows.length > 0 ? (
            <TableBody table={table} />
          ) : (
            <TableEmptyState
              tableColumnsCount={table.getAllColumns().length}
              {...tableEmptyStateProps}
            />
          )}
        </Table>
      </div>
    </div>
  );
}

export default MainTable;
