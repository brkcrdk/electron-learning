import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_main/users/new-user')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_main/user-list/new-user"!</div>;
}
