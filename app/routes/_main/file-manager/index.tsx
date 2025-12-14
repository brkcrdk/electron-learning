import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_main/file-manager/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_main/file-manager/"!</div>;
}
