import MainTable, { type TableProps } from './main-table';
import TableLoader from './table-loader';

function Table<T>({ ...props }: TableProps<T>) {
  // if (isLoading) return <TableLoader />;

  // return <MainTable {...props} />;
  return <TableLoader />;
}
export default Table;
