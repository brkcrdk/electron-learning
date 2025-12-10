import { createFileRoute } from '@tanstack/react-router';

import DataTable from '@app/components/data-table';
import useUserListQuery from '@app/services/use-user-list-query';

import useColumns from './hooks/use-columns';
import useTableActions from './hooks/use-table-actions';

export const Route = createFileRoute('/_main/users/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { data, isLoading } = useUserListQuery();

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
