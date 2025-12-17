import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';

import DataTable from '@app/components/data-table';
import educationAssignmentListQuery from '@app/services/education-assignment-list-query';

import useColumns from './hooks/use-columns';
import useTableActions from './hooks/use-table-actions';

export const Route = createFileRoute('/_main/education-assignments/')({
  validateSearch: z.object({
    page: z.number().default(1),
    limit: z.number().default(10),
  }),
  component: RouteComponent,
});

function RouteComponent() {
  const { page, limit } = Route.useSearch();

  const { data, isLoading } = useQuery(educationAssignmentListQuery({ page, limit }));

  const columns = useColumns();
  const tableActions = useTableActions();

  return (
    <DataTable
      tableTitle="Eğitim Atamaları"
      columns={columns}
      data={data ? data.items : []}
      tableActions={tableActions}
      isLoading={isLoading}
      rowSelectionProps={{
        enableRowSelection: false,
      }}
    />
  );
}
