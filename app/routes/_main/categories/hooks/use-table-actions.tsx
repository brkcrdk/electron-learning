import type { TableActionsProps } from '@app/components/data-table';

import NewCategory from '../modules/new-category';

function useTableActions(): TableActionsProps[] {
  return [
    {
      actionId: 'add-new-category',
      actionElement: <NewCategory />,
    },
  ];
}

export default useTableActions;
