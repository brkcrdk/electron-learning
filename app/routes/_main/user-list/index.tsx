import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_main/user-list/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_main/user-list/"!</div>;
}
