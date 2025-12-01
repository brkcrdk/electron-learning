import MainTable, { type TableProps } from './main-table';
import TableLoader from './table-loader';

import type { TableActionsProps } from './table-types';
import type { RowData } from '@tanstack/react-table';

function Table<T>({ isLoading, ...props }: TableProps<T>) {
  if (isLoading) return <TableLoader />;

  return <MainTable {...props} />;
}
export default Table;

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
