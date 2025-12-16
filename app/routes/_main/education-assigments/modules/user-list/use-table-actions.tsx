import type { TableActionsProps } from '@app/components/data-table';
import Button from '@app/components/ui/button';

function useTableActions(): TableActionsProps[] {
  return [
    {
      actionId: 'assign-with-excel',
      actionElement: <Button>Excel İle Atama Yap</Button>,
    },
  ];
}

export default useTableActions;
