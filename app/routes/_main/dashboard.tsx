import { createFileRoute, Link } from '@tanstack/react-router';

import DataTable from '@app/components/data-table';
import Button, { buttonVariants } from '@app/components/ui/button';

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
      tableActions={[
        {
          actionId: 'xx',
          actionElement: <Button>Add</Button>,
        },
        {
          actionId: 'xx2',
          actionElement: (
            <Link
              className={buttonVariants({ variant: 'default' })}
              to="/"
            >
              Add
            </Link>
          ),
        },
      ]}
      data={[]}
      columns={[]}
    />
  );
}
