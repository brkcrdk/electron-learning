import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

import DataTable from '@app/components/data-table';

import useColumns from './hooks/use-columns';
import useTableActions from './hooks/use-table-actions';

export const Route = createFileRoute('/_main/categories/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { data, isLoading } = useQuery({
    queryKey: ['category-list'],
    queryFn: async () => {
      const response = await window.electronAPI.getCategoryList();
      if (!response.success) {
        throw response.error;
      }
      return response.data;
    },
  });

  const columns = useColumns();
  const tableActions = useTableActions();

  return (
    <DataTable
      tableTitle="Kategori Listesi"
      columns={columns}
      data={data ? data : []}
      isLoading={isLoading}
      tableActions={tableActions}
      rowSelectionProps={{
        enableRowSelection: false,
      }}
      tableOptions={{
        getSubRows: row => row.children,
      }}
    />
  );
}
