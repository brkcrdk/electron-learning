import type { TableActionsProps } from '@app/components/data-table';

import NewMaterial from '../modules/new-material';

function useTableActions(): TableActionsProps[] {
  return [
    {
      actionId: 'add-new-material',
      actionElement: <NewMaterial />,
    },
  ];
}

export default useTableActions;
