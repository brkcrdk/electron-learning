import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_main/categories/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_main/categories/"!</div>;
}
