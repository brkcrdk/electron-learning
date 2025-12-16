import { useFormContext } from 'react-hook-form';

import type { TableActionsProps } from '@app/components/data-table';
import Button from '@app/components/ui/button';
import UploadProvider from '@app/components/ui/upload-provider';

import type { AssigmentFormProps } from '..';

function useActions(): TableActionsProps[] {
  const { control } = useFormContext<AssigmentFormProps>();

  return [
    {
      actionId: 'assign-with-excel',
      actionElement: (
        <UploadProvider
          accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          onChange={file => {
            console.log(file);
          }}
        >
          <Button>Excel İle Atama Yap</Button>
        </UploadProvider>
      ),
    },
  ];
}

export default useActions;
