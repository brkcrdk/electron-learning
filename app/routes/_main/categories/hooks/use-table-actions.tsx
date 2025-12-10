import type { TableActionsProps } from '@app/components/data-table';

// import NewUser from '../modules/new-user';

function useTableActions(): TableActionsProps[] {
  return [
    {
      actionId: 'add-new-category',
      actionElement: 'new category',
    },
  ];
}

export default useTableActions;
