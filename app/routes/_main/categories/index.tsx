import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

import DataTable from '@app/components/data-table';

import useColumns from './hooks/use-columns';

export const Route = createFileRoute('/_main/categories/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { data, isLoading } = useQuery({
    queryKey: ['category-list'],
    queryFn: async () => {
      const response = await window.electronAPI.getCategoryList();
      if (!response.success) {
        throw response;
      }
      return response.data;
    },
  });

  const columns = useColumns();

  return (
    <DataTable
      tableTitle="Kategori Listesi"
      columns={columns}
      data={data ? data : []}
      isLoading={isLoading}
      // tableActions={tableActions}
    />
  );
}
