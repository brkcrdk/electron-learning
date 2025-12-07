import { createFileRoute } from '@tanstack/react-router';

import Table from '@app/components/ui/table';
import useUserListQuery from '@app/services/use-user-list-query';

import useColumns from './hooks/use-columns';

export const Route = createFileRoute('/_main/users/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { data, isLoading } = useUserListQuery();

  const columns = useColumns();

  return (
    <Table
      tableTitle="Kullanıcı Listesi"
      columns={columns}
      data={data ? data : []}
      isLoading={isLoading}
    />
  );
}
