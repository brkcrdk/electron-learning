import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';

import Table from '../../components/ui/table';

import type { RowSelectionState } from '@tanstack/react-table';

export const Route = createFileRoute('/_main/route-c')({
  component: RouteComponent,
});

function RouteComponent() {
  const [selectedRows, setSelectedRows] = useState<RowSelectionState>({});

  return (
    <div>
      <Table
        searchProps={{
          placeholder: 'Search by name',
          value: '',
          onSearch: value => {
            console.log(value);
          },
        }}
        data={[
          {
            id: '231313fffff213',
            name: 'John Doex',
            age: 20,
            gender: 'male',
            email: 'john.doe@example.com',
          },
          {
            id: 'qweqadq12313eqasdasd',
            name: 'Jane Doe1',
            age: 21,
            gender: 'female',
            email: 'jane.doe@example.com',
          },
          {
            id: 'qwewqeqf1233g3g3gg3g3g3',
            name: 'John Doe2',
            age: 20,
            gender: 'male',
            email: 'john.doe@example.com',
          },
        ]}
        columns={[
          {
            header: 'Name',
            accessorKey: 'name',
          },
          {
            header: 'Age',
            accessorKey: 'age',
          },
          {
            header: 'Gender',
            accessorKey: 'gender',
            enableSorting: false,
          },
          {
            header: 'Email',
            accessorKey: 'email',
          },
        ]}
        tableTitle="Table Title"
        rowSelectionProps={{
          enableRowSelection: true,
          rowSelection: selectedRows,
          onRowSelectionChange: setSelectedRows,
          getRowId: row => row.id,
        }}
        paginationProps={{
          limit: 10,
          page: 1,
          pageCount: 10,
          onPaginationChange: value => {
            console.log(value);
          },
          onLimitChange: value => {
            console.log(value);
          },
        }}
        tableActions={[
          {
            actionId: 'create',
            actionType: 'button',
            actionProps: {
              children: 'Create',
            },
          },
          {
            actionId: 'edit',
            actionType: 'custom',
            actionElement: <div>Edit</div>,
          },
        ]}
      />
    </div>
  );
}
