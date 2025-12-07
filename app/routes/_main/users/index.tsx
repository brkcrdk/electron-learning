import { createFileRoute } from '@tanstack/react-router';

import useUserListQuery from '../../../services/use-user-list-query';

export const Route = createFileRoute('/_main/users/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { data, isError, isLoading, error } = useUserListQuery();

  return (
    <div>
      <pre>{JSON.stringify(data, null, 4)}</pre>
      <pre>{JSON.stringify({ isError, isLoading, error }, null, 4)}</pre>
    </div>
  );
}
