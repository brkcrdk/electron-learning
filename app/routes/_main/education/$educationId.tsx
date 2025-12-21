import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_main/education/$educationId')({
  component: RouteComponent,
  staticData: {
    breadcrumb: 'Eğitim',
  },
});

function RouteComponent() {
  const { educationId } = Route.useParams();
  return <div>Hello "/_main/education/{educationId}"!</div>;
}
