import MainTable, { type TableProps } from './main-table';
import TableLoader from './table-loader';

function Table<T>({ isLoading, ...props }: TableProps<T>) {
  if (isLoading) return <TableLoader />;

  return <MainTable {...props} />;
}
export default Table;
