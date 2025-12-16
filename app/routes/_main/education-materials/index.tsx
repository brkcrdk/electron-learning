import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

import DataTable from '@app/components/data-table';

import useColumns from './hooks/use-columns';
import useTableActions from './hooks/use-table-actions';

export const Route = createFileRoute('/_main/education-materials/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { data, isLoading } = useQuery({
    queryKey: ['education-materials'],
    queryFn: async () => {
      const response = await window.electronAPI.getEducationMaterialList();
      if (!response.success) {
        throw response.error;
      }
      return response.data;
    },
  });

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
