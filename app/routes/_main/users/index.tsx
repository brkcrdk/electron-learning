import { createFileRoute } from '@tanstack/react-router';

import useUserListQuery from '@app/services/use-user-list-query';

import useColumns from './hooks/use-columns';
import Table from '../../../components/ui/table';

export const Route = createFileRoute('/_main/users/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { data, isLoading } = useUserListQuery();

  const columns = useColumns();

  return (
    <Table
      columns={columns}
      data={data ? data : []}
      isLoading={isLoading}
    />
  );
}
