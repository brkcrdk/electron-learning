import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

import DataTable from '@app/components/data-table';
import educationListQuery from '@app/services/education-list-query';

import useColumns from './hooks/use-columns';
import useTableActions from './hooks/use-table-actions';

export const Route = createFileRoute('/_main/education-list/')({
  component: RouteComponent,
  staticData: {
    breadcrumb: 'Eğitim Listesi',
  },
});

function RouteComponent() {
  const { data, isLoading } = useQuery(educationListQuery);

  const columns = useColumns();
  const tableActions = useTableActions();

  return (
    <DataTable
      tableTitle="Eğitim Listesi"
      columns={columns}
      data={data ? data : []}
      isLoading={isLoading}
      tableActions={tableActions}
      rowSelectionProps={{
        enableRowSelection: false,
      }}
    />
  );
}
