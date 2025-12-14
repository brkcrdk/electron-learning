import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

import DataTable from '@app/components/data-table';

import useColumns from './hooks/use-columns';
import useTableActions from './hooks/use-table-actions';

export const Route = createFileRoute('/_main/users/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { data, isLoading } = useQuery({
    queryKey: ['user-list'],
    queryFn: async () => {
      const response = await window.electronAPI.getUserList();
      if (!response.success) {
        throw new Error(response.error);
      }
      return response.data;
    },
  });

  const columns = useColumns();
  const tableActions = useTableActions();

  return (
    <DataTable
      tableTitle="Kullanıcı Listesi"
      columns={columns}
      data={data ? data : []}
      isLoading={isLoading}
      tableActions={tableActions}
    />
  );
}
