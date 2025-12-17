import type { TableActionsProps } from '@app/components/data-table';

import NewAssigment from '../modules/new-assigment';

function useTableActions(): TableActionsProps[] {
  return [
    {
      actionId: 'add-new-assigment',
      actionElement: <NewAssigment />,
    },
  ];
}

export default useTableActions;
