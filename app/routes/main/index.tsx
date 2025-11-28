import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/main/')({
  component: RouteComponent,

  beforeLoad: async () => {
    // TODO: Check if user is authenticated
    // throw redirect({ to: '/' });
  },
});

function RouteComponent() {
  return <div>Hello "/main/"!</div>;
}
