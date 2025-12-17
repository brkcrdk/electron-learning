import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

import DataTable from '@app/components/data-table';

import useTableActions from './hooks/useTableActions';

export const Route = createFileRoute('/_main/education-assigments/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { data, isLoading } = useQuery({
    queryKey: ['education-assigments'],
    queryFn: async () => {
      const response = await window.electronAPI.getEducationAssignmentList();
      if (!response.success) {
        throw response.error;
      }
      return response.data;
    },
  });
  // const columns = useColumns();
  const tableActions = useTableActions();

  return (
    <DataTable
      tableTitle="Eğitim Atamaları"
      columns={[]}
      data={[]}
      tableActions={tableActions}
      isLoading={isLoading}
      rowSelectionProps={{
        enableRowSelection: false,
      }}
    />
  );
}
