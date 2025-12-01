import MainTable, { TableProps } from './MainTable';
import TableLoader from './TableLoader';

function Table<T>({ isLoading, ...props }: TableProps<T>) {
  if (isLoading) return <TableLoader />;

  return <MainTable {...props} />;
}
export default Table;
