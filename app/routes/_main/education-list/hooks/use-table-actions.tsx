import type { TableActionsProps } from '@app/components/data-table';

import NewEducation from '../modules/new-education';

function useTableActions(): TableActionsProps[] {
  return [
    {
      actionId: 'add-new-education',
      actionElement: <NewEducation />,
    },
  ];
}

export default useTableActions;
