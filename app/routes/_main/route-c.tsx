import { createFileRoute } from '@tanstack/react-router';

import Table from '../../components/ui/table';

export const Route = createFileRoute('/_main/route-c')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      Hello "/main/route-c"!
      <Table
        data={[
          {
            name: 'John Doe',
            age: 20,
            gender: 'male',
            email: 'john.doe@example.com',
          },
          {
            name: 'Jane Doe',
            age: 21,
            gender: 'female',
            email: 'jane.doe@example.com',
          },
          {
            name: 'John Doe',
            age: 20,
            gender: 'male',
            email: 'john.doe@example.com',
          },
        ]}
        columns={[
          {
            header: 'Name',
            accessorKey: 'name',
            meta: { centeredColumn: true },
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
        // isDisabled
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
