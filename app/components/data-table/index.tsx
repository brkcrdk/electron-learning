import type { RowData } from '@tanstack/react-table';

import MainTable, { type TableProps } from './main-table';
import { type TableActionsProps } from './table-header/table-actions';
import TableLoader from './table-loader';

function DataTable<T>({ isLoading, ...props }: TableProps<T>) {
  if (isLoading) return <TableLoader />;

  return <MainTable {...props} />;
}
export default DataTable;
export type { TableActionsProps };

declare module '@tanstack/react-table' {
  interface ColumnMeta<TData extends RowData, TValue> {
    /**
     * Header elementini ortalı bir şekilde render etmek istersek bu prop ile bu durumu yönetebiliriz.
     * Varsayılan olarak sola dayalı bir şekilde render olur.
     * @defaultValue `false`
     */
    centeredColumn?: boolean;
    /**
     * td elementine ait stillendirmeleri değiştirmek istersek bu property ile bu durumu yönetebiliriz.
     */
    className?: string;
  }
}
