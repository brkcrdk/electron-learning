import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_main/my-educations/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_main/my-educations/"!</div>;
}
