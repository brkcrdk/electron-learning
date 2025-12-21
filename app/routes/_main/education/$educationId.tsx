import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_main/education/$educationId')({
  component: RouteComponent,
  staticData: {
    breadcrumb: 'Eğitim',
  },
  loader: async ({ params }) => {
    // const education = await db.query.educations.findFirst({
    //   where: eq(educations.id, params.educationId),
    // });
    // return { education };
  },
});

function RouteComponent() {
  const { educationId } = Route.useParams();
  return <div>Hello "/_main/education/{educationId}"!</div>;
}
