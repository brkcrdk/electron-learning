import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_main/my-favourites/')({
  component: RouteComponent,
  staticData: {
    breadcrumb: 'Favorilerim',
  },
});

function RouteComponent() {
  return <div>Hello "/_main/my-favourites/"!</div>;
}
