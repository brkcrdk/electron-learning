import { useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import type { RowSelectionState } from '@tanstack/react-table';

import DataTable from '@app/components/data-table';

import useTableActions from './use-table-actions';
import useUserListColumns from './user-list-columns';

function UserList() {
  const [page, setPage] = useState(1);
  const [searchUser, setSearchUser] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<RowSelectionState>({});

  const { data } = useQuery({
    queryKey: ['assigment-user-list', page, searchUser],
    queryFn: async () => {
      const response = await window.electronAPI.getPaginatedUserList({
        page,
        search: searchUser,
      });
      if (!response.success) {
        throw response.error;
      }
      return response.data;
    },
  });

  const columns = useUserListColumns();
  const tableActions = useTableActions();

  return (
    <DataTable
      tableTitle="Eğitim Atanacak Kullanıcılar"
      columns={columns}
      data={data ? data.items : []}
      tableActions={tableActions}
      rowSelectionProps={{
        enableRowSelection: true,
        rowSelection: selectedUsers,
        onRowSelectionChange: setSelectedUsers,
      }}
      paginationProps={
        data
          ? {
              page,
              onPaginationChange: setPage,
              limit: data.pagination.limit,
              onItemsPerPageChange: () => {},
              pageCount: data.pagination.totalPages,
            }
          : undefined
      }
      searchProps={{
        value: searchUser,
        onSearch: setSearchUser,
        placeholder: 'Kişi ara..',
      }}
    />
  );
}

export default UserList;
