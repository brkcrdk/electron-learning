import { createFileRoute } from '@tanstack/react-router';

import DataTable from '@app/components/data-table';

import useTableActions from './hooks/useTableActions';

export const Route = createFileRoute('/_main/education-assigments/')({
  component: RouteComponent,
});

function RouteComponent() {
  // const columns = useColumns();
  const tableActions = useTableActions();

  return (
    <DataTable
      tableTitle="Eğitim Atamaları"
      columns={[]}
      data={[]}
      tableActions={tableActions}
      rowSelectionProps={{
        enableRowSelection: false,
      }}
    />
  );
}
