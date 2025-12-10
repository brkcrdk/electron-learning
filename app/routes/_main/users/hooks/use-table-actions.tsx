import type { TableActionsProps } from '@app/components/data-table';

import NewUser from '../modules/new-user';

function useTableActions(): TableActionsProps[] {
  return [
    {
      actionId: 'add-user',
      actionElement: <NewUser />,
    },
  ];
}

export default useTableActions;
