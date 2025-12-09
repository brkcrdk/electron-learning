import { createFileRoute } from '@tanstack/react-router';

import DataTable from '@app/components/data-table';

export const Route = createFileRoute('/_main/dashboard')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <DataTable
      tableTitle="Table Header"
      searchProps={{
        value: '',
        placeholder: 'Ara...',
        onSearch: value => {
          console.log(value);
        },
      }}
      data={[
        {
          id: 1,
          name: 'John Doe',
          age: 20,
        },
        {
          id: 2,
          name: 'Jane Doe',
          age: 21,
        },
        {
          id: 3,
          name: 'John Doe',
          age: 20,
        },
      ]}
      columns={[
        {
          header: 'ID',
          accessorKey: 'id',
        },
        {
          header: 'Name',
          accessorKey: 'name',
          enableSorting: false,
          meta: {
            centeredColumn: true,
          },
        },
        {
          header: 'Age',
          accessorKey: 'age',
          meta: {
            centeredColumn: true,
          },
        },
      ]}
    />
  );
}
