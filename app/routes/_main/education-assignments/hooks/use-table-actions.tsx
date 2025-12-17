import type { TableActionsProps } from '@app/components/data-table';

import NewAssignment from '../modules/new-assignment';

function useTableActions(): TableActionsProps[] {
  return [
    {
      actionId: 'add-new-assigment',
      actionElement: <NewAssignment />,
    },
  ];
}

export default useTableActions;
