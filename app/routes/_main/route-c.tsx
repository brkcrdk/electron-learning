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
        data={[]}
        tableTitle="Table Title"
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
