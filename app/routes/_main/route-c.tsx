import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_main/route-c')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/main/route-c"!</div>;
}
