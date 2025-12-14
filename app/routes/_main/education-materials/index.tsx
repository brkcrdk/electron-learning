import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_main/education-materials/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <input type="file" />
    </div>
  );
}
