import { createFileRoute } from '@tanstack/react-router';

import DataTable from '@app/components/data-table';

import useTableActions from './hooks/use-table-actions';

export const Route = createFileRoute('/_main/education-materials/')({
  component: RouteComponent,
});

function RouteComponent() {
  // const columns = useColumns();
  const tableActions = useTableActions();

  return (
    <DataTable
      tableTitle="Eğitim Malzemeleri Listesi"
      columns={[]}
      data={[]}
      isLoading={false}
      tableActions={tableActions}
      // columns={columns}
      // data={data ? data : []}
      // isLoading={isLoading}
      // tableActions={tableActions}
    />
  );
}
