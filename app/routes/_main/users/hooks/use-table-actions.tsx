import type { TableActionsProps } from '@app/components/data-table';

import AddUserBulk from '../modules/add-user-bulk';
import NewUser from '../modules/new-user';

function useTableActions(): TableActionsProps[] {
  return [
    {
      actionId: 'bulk-create-users-from-excel',
      actionElement: <AddUserBulk />,
    },
    {
      actionId: 'add-user',
      actionElement: <NewUser />,
    },
  ];
}

export default useTableActions;
