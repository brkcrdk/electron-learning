import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';

import DataTable from '@app/components/data-table';

import useColumns from './hooks/use-columns';
import useTableActions from './hooks/use-table-actions';

export const Route = createFileRoute('/_main/users/')({
  validateSearch: z.object({
    page: z.number().default(1),
    limit: z.number().default(10),
  }),
  component: RouteComponent,
});

function RouteComponent() {
  const { page, limit } = Route.useSearch();
  const { data, isLoading } = useQuery({
    queryKey: ['paginated-user-list', page, limit],
    queryFn: async () => {
      const response = await window.electronAPI.getPaginatedUserList({ page, limit });
      if (!response.success) {
        throw new Error(response.error);
      }
      return response.data;
    },
  });

  const columns = useColumns();
  const tableActions = useTableActions();

  return (
    <DataTable
      tableTitle="Kullanıcı Listesi"
      columns={columns}
      data={data ? data.items : []}
      isLoading={isLoading}
      tableActions={tableActions}
      rowSelectionProps={{
        enableRowSelection: false,
      }}
      paginationProps={{
        limit: 10,
        onItemsPerPageChange: limit => {
          console.log(limit);
        },
        onPaginationChange: page => {
          console.log(page);
        },
        page: 1,
        pageCount: 10,
      }}
    />
  );
}
