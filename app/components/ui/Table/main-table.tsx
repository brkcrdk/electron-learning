// import { ReactNode } from 'react';

import {} from // ColumnDef,
// OnChangeFn,
// SortingState,
// getCoreRowModel,
// useReactTable,
// RowSelectionState,
// Row,
// TableOptions,
// SortDirection,
'@tanstack/react-table';
import TableEmptyState from './table-empty-state';
import TableHeader from './table-header';
import { type TableSearchProps } from './table-header/table-search-bar';
import { type TableActionsProps } from '../table/table-types';
// import EmptyContent from '../EmptyContent';

// import TableBody from './TableBody';
// import TableFooter, { TableLimitProps, TablePaginationProps } from './TableFooter';
// import TableHead from './TableHead';
// import TableHeader from './TableHeader';
// import TableRowSortContext from './TableRowSortContext';
// import useTableColumns from './useTableColumns';

// export interface SortingChangeStateProps {
//   id: string;
//   direction: SortDirection | false;
// }

// interface SortingProps {
//   sorting: SortingState;
//   onSortingChange: (val: SortingChangeStateProps) => void;
// }

// export type RowSelectionProps<T> =
//   | {
//       enableRowSelection: false;
//     }
//   | {
//       enableRowSelection: true;
//       rowSelection: RowSelectionState;
//       onRowSelectionChange: OnChangeFn<RowSelectionState>;
//       /**
//        * Eğer rowlar seçerken indexine göre değilde bizim belirteceğimiz row indexine göre
//        * seçip ona göre saklarız
//        * * **NOTE**: Bu değer uniq bir değeri ifade etmelidir.
//        */
//       getRowId?: (row: T) => string;
//     };

export interface TableProps<T> {
  data: T[];
  // columns: ColumnDef<T>[];
  // customEmptyState?: ReactNode;
  tableTitle?: string;
  searchProps?: TableSearchProps;
  tableActions?: TableActionsProps[];
  // paginationProps?: TablePaginationProps;
  // limitProps?: TableLimitProps;
  // sortingProps?: SortingProps;
  // rowSelectionProps?: RowSelectionProps<T>;
  // pinnedColumns?: string[];
  isLoading?: boolean;
  isDisabled?: boolean;
  // /**
  //  * Eğer tablo üzerinde yer alan satırlara hover yapıldığı zaman bir event çalıştırmak istersek
  //  * bu aksiyonu prop ile gerçekleştirebiliriz.
  //  *
  //  * @param rowData mevcut table rowda gelecek olan veriyi ifade eder
  //  */
  // onRowPointerEnter?: (rowData: Row<T>) => void;
  // /**
  //  * TableOptions ile default tablo ayarlarını güncelleyebiliriz.
  //  * @see https://tanstack.com/table/latest/docs/api/core/TableOptions
  //  */
  // tableOptions?: TableOptions<T>;
}

function MainTable<T>({
  // columns,
  data,
  tableTitle,
  searchProps,
  tableActions,
  // limitProps,
  // paginationProps,
  // customEmptyState,
  isDisabled,
  // pinnedColumns,
  // onRowPointerEnter,
  // tableOptions,
  // sortingProps = {
  //   sorting: [],
  //   onSortingChange: () => {},
  // },
  // rowSelectionProps = {
  //   enableRowSelection: true,
  //   rowSelection: {},
  //   onRowSelectionChange: () => {},
  // },
}: TableProps<T>) {
  // const { memoizedColumns, computedColumnPinning, columnOrder, setColumnOrder } = useTableColumns({
  //   columns,
  //   pinnedColumns,
  //   rowSelectionProps,
  // });

  // const table = useReactTable({
  //   data,
  //   columns: memoizedColumns,
  //   state: {
  //     columnOrder,
  //     sorting: sortingProps.sorting,
  //     rowSelection: rowSelectionProps.enableRowSelection ? rowSelectionProps.rowSelection : {},
  //     columnPinning: {
  //       left: computedColumnPinning,
  //     },
  //   },
  //   enableSorting: true,
  //   enableMultiSort: false,
  //   manualSorting: true,
  //   enableRowSelection: rowSelectionProps.enableRowSelection,
  //   getRowId: rowSelectionProps.enableRowSelection ? rowSelectionProps.getRowId : undefined,
  //   onRowSelectionChange: rowSelectionProps.enableRowSelection ? rowSelectionProps.onRowSelectionChange : undefined,
  //   onColumnOrderChange: setColumnOrder,
  //   getCoreRowModel: getCoreRowModel(),
  //   enableColumnResizing: true,
  //   columnResizeMode: 'onChange',
  //   debugTable: process.env.NODE_ENV === 'development',
  //   debugHeaders: process.env.NODE_ENV === 'development',
  //   debugColumns: process.env.NODE_ENV === 'development',
  //   ...tableOptions,
  // });

  return (
    <div
      aria-disabled={isDisabled}
      className="group/table rounded-box border-base-content/5 bg-base-100 flex w-full flex-col gap-5 overflow-hidden border p-4"
    >
      <TableHeader
        tableTitle={tableTitle}
        searchProps={searchProps}
        tableActions={tableActions}
      />
      <TableEmptyState
        onClearFilters={() => {}}
        newItemProps={{
          label: 'Yeni Kayıt Ekle',
          onAddNewItem: () => {
            console.log('Yeni Kayıt Ekle');
          },
        }}
      />
      {/* 
      {table.getRowModel().rows.length > 0 ? (
        <>
          <div className="overflow-auto">
            <table className="w-full border-separate border-spacing-0 overflow-auto group-aria-disabled/table:pointer-events-none group-aria-disabled/table:opacity-30">
              <TableHead
                table={table}
                onSortingChange={sortingProps.onSortingChange}
              />
              <TableBody
                table={table}
                onRowPointerEnter={onRowPointerEnter}
              />
            </table>
          </div>
          <TableFooter
            limitProps={limitProps}
            paginationProps={paginationProps}
          />
        </>
      ) : (
        <table className="group-aria-disabled/table:pointer-events-none group-aria-disabled/table:opacity-30">
          <tbody>
            <tr>
              <td colSpan={memoizedColumns.length}>{customEmptyState ? customEmptyState : <EmptyContent />}</td>
            </tr>
          </tbody>
        </table>
      )} */}
    </div>
  );
}

export default MainTable;
