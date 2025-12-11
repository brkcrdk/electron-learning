import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_main/education-list/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_main/education-list/"!</div>;
}
