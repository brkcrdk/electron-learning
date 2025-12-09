import { createFileRoute } from '@tanstack/react-router';

import DataTable from '@app/components/data-table';

export const Route = createFileRoute('/_main/dashboard')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <DataTable
      data={[]}
      columns={[]}
    />
  );
}
