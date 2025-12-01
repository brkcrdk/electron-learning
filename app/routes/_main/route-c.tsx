import { createFileRoute } from '@tanstack/react-router';

import Table from '../../components/ui/table';

export const Route = createFileRoute('/_main/route-c')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      Hello "/main/route-c"!
      <Table data={[]} />
    </div>
  );
}
