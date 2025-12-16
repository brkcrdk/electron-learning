import { useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import type { RowSelectionState } from '@tanstack/react-table';

import DataTable from '@app/components/data-table';

import ExampleFile from './example-file';
import useActions from './use-actions';
import useColumns from './use-columns';

function UserList() {
  const [page, setPage] = useState(1);
  const [searchUser, setSearchUser] = useState('');
  const [limit, setLimit] = useState(10);
  const [selectedUsers, setSelectedUsers] = useState<RowSelectionState>({});

  const { data } = useQuery({
    queryKey: ['assigment-user-list', page, searchUser, limit],
    queryFn: async () => {
      const response = await window.electronAPI.getPaginatedUserList({
        page,
        search: searchUser,
        limit,
      });
      if (!response.success) {
        throw response.error;
      }
      return response.data;
    },
  });

  const columns = useColumns();
  const tableActions = useActions();

  return (
    <div className="flex flex-col gap-4">
      <ExampleFile />
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
                onItemsPerPageChange: limit => {
                  setLimit(limit);
                  setPage(1);
                },
                pageCount: data.pagination.totalPages,
              }
            : undefined
        }
        searchProps={{
          value: searchUser,
          onSearch: search => {
            setSearchUser(search);
            setPage(1);
          },
          placeholder: 'Kişi ara..',
        }}
      />
    </div>
  );
}

export default UserList;
