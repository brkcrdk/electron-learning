import { useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { Controller, useFormContext } from 'react-hook-form';

import DataTable from '@app/components/data-table';
import assignmentUserListQuery from '@app/services/assigment-user-list-query';

import type { AssigmentFormProps } from '..';
import useActions from './use-actions';
import useColumns from './use-columns';

function UserList() {
  const [page, setPage] = useState(1);
  const [searchUser, setSearchUser] = useState('');
  const [limit, setLimit] = useState(10);

  const { control } = useFormContext<AssigmentFormProps>();

  const { data } = useQuery(assignmentUserListQuery({ page, limit, search: searchUser }));

  const columns = useColumns();
  const tableActions = useActions();

  return (
    <Controller
      control={control}
      name="selectedUsers"
      render={({ field }) => (
        <DataTable
          tableTitle="Eğitim Atanacak Kullanıcılar"
          columns={columns}
          data={data ? data.items : []}
          tableActions={tableActions}
          rowSelectionProps={{
            enableRowSelection: true,
            rowSelection: field.value,
            onRowSelectionChange: field.onChange,
            getRowId: row => String(row.id),
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
      )}
    />
  );
}

export default UserList;
