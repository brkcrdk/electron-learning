import {
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
  type OnChangeFn,
  type RowSelectionState,
  type SortDirection,
  type SortingState,
  type TableOptions,
} from '@tanstack/react-table';

// import TableBody from './table-body';
// import TableEmptyState, { type TableEmptyStateProps } from './table-empty-state';
// import TableFooter, { type TablePaginationProps } from './table-footer';
// import TableHead from './table-head';
import TableHeader from './table-header';
import type { TableActionsProps } from './table-header/table-actions';
import { type TableSearchProps } from './table-header/table-search-bar';
import useTableColumns from './use-table-columns';

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
  // tableEmptyStateProps?: TableEmptyStateProps;
  isLoading?: boolean;
  isDisabled?: boolean;
  /**
   * TableOptions ile default tablo ayarlarını güncelleyebiliriz.
   * @see https://tanstack.com/table/latest/docs/api/core/TableOptions
   */
  tableOptions?: TableOptions<T>;
}

function MainTable<T>({
  columns,
  data,
  tableTitle,
  searchProps,
  tableActions,
  // paginationProps,
  isDisabled,
  // tableEmptyStateProps,
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
    enableRowSelection: rowSelectionProps.enableRowSelection,
    getRowId: rowSelectionProps.enableRowSelection ? rowSelectionProps.getRowId : undefined,
    onRowSelectionChange: rowSelectionProps.enableRowSelection ? rowSelectionProps.onRowSelectionChange : undefined,
    getCoreRowModel: getCoreRowModel(),
    debugTable: import.meta.env.DEV,
    debugHeaders: import.meta.env.DEV,
    debugColumns: import.meta.env.DEV,
    ...tableOptions,
  });

  return (
    <div
      aria-disabled={isDisabled}
      // className="group/table rounded-box border-base-content/5 bg-base-100 flex w-full flex-col gap-5 overflow-hidden border p-4"
      className="group/table"
    >
      <TableHeader
        tableTitle={tableTitle}
        searchProps={searchProps}
        tableActions={tableActions}
      />

      {table.getRowModel().rows.length > 0 ? (
        <>
          <div className="overflow-auto">
            <table className="table group-aria-disabled/table:pointer-events-none group-aria-disabled/table:opacity-30">
              {/* <TableHead
                table={table}
                onSortingChange={sortingProps.onSortingChange}
              /> */}
              {/* <TableBody table={table} /> */}
            </table>
          </div>
          {/* {paginationProps && <TableFooter {...paginationProps} />} */}
        </>
      ) : (
        <table className="group-aria-disabled/table:pointer-events-none group-aria-disabled/table:opacity-30">
          <tbody>
            <tr>
              <td colSpan={1}>{/* <TableEmptyState {...tableEmptyStateProps} /> */}</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
}

export default MainTable;
