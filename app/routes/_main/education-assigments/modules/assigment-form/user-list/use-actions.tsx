import type { RowSelectionState } from '@tanstack/react-table';
import { useFormContext } from 'react-hook-form';

import type { TableActionsProps } from '@app/components/data-table';
import Button from '@app/components/ui/button';
import UploadProvider from '@app/components/ui/upload-provider';

import type { AssigmentFormProps } from '..';

function useActions(): TableActionsProps[] {
  const { setValue } = useFormContext<AssigmentFormProps>();

  return [
    {
      actionId: 'assign-with-excel',
      actionElement: (
        <UploadProvider
          accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          onChange={async file => {
            const fileBuffer = await file.arrayBuffer();
            const response = await window.electronAPI.extractUserFromExcel(fileBuffer);

            if (!response.success) {
              throw response.error;
            }
            const selectedUsers: RowSelectionState = {};

            for (const user of response.data) {
              selectedUsers[user] = true;
            }
            setValue('selectedUsers', selectedUsers);
          }}
        >
          <Button type="button">Excel İle Atama Yap</Button>
        </UploadProvider>
      ),
    },
  ];
}

export default useActions;
