import { createFileRoute } from '@tanstack/react-router';

import DataTable from '@app/components/data-table';

export const Route = createFileRoute('/_main/education-materials/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <DataTable
      tableTitle="Eğitim Malzemeleri Listesi"
      columns={[]}
      data={[]}
      isLoading={false}
      tableActions={[]}
      // columns={columns}
      // data={data ? data : []}
      // isLoading={isLoading}
      // tableActions={tableActions}
    />
  );
}
