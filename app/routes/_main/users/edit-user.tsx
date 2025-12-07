import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_main/users/edit-user')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_main/user-list/edit-user"!</div>;
}
