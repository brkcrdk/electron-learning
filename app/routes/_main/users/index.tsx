import { useQuery } from '@tanstack/react-query';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { z } from 'zod';

import DataTable from '@app/components/data-table';

import useColumns from './hooks/use-columns';
import useTableActions from './hooks/use-table-actions';

export const Route = createFileRoute('/_main/users/')({
  validateSearch: z.object({
    page: z.number().default(1),
    limit: z.number().default(10),
    search: z.string().default(''),
  }),
  component: RouteComponent,
});

function RouteComponent() {
  const { page, limit, search } = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });

  const { data } = useQuery({
    queryKey: ['paginated-user-list', page, limit, search],
    queryFn: async () => {
      const response = await window.electronAPI.getPaginatedUserList({ page, limit, search });
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
      tableActions={tableActions}
      rowSelectionProps={{
        enableRowSelection: false,
      }}
      searchProps={{
        value: search,
        onSearch: search => {
          navigate({ search: { search, page: 1 } });
        },
        placeholder: 'Kişi ara..',
      }}
      paginationProps={
        data
          ? {
              limit,
              onItemsPerPageChange: limit => {
                navigate({ search: { limit } });
              },
              onPaginationChange: page => {
                navigate({ search: { page } });
              },
              page,
              pageCount: data.pagination.totalPages,
            }
          : undefined
      }
    />
  );
}
