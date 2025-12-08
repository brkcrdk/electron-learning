import type { TableActionsProps } from '@app/components/ui/table';

import NewUser from '../modules/new-user';

function useTableActions(): TableActionsProps[] {
  return [
    {
      actionId: 'add-user',
      actionType: 'custom',
      actionElement: <NewUser />,
    },
  ];
}

export default useTableActions;
