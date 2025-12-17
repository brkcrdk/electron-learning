import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

import DataTable from '@app/components/data-table';
import educationMaterialsQuery from '@app/services/education-materials-query';

import useColumns from './hooks/use-columns';
import useTableActions from './hooks/use-table-actions';

export const Route = createFileRoute('/_main/education-materials/')({
  component: RouteComponent,
  staticData: {
    breadcrumb: 'Eğitim Materyalleri',
  },
});

function RouteComponent() {
  const { data, isLoading } = useQuery(educationMaterialsQuery);

  const columns = useColumns();
  const tableActions = useTableActions();

  return (
    <DataTable
      tableTitle="Eğitim İçerikleri Listesi"
      columns={columns}
      data={data ? data : []}
      tableActions={tableActions}
      isLoading={isLoading}
      rowSelectionProps={{
        enableRowSelection: false,
      }}
    />
  );
}
