import type { TableActionsProps } from '@app/components/data-table';

import NewContent from '../modules/new-content';

function useTableActions(): TableActionsProps[] {
  return [
    {
      actionId: 'add-new-content',
      actionElement: <NewContent />,
    },
  ];
}

export default useTableActions;
