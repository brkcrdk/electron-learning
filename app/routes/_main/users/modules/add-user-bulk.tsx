import { useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import Button from '@app/components/ui/button';
import Dialog from '@app/components/ui/dialog';
import Icon from '@app/components/ui/icon';
import UploadProvider from '@app/components/ui/upload-provider';
import queryKeys from '@app/services/query-keys';

function AddUserBulk() {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  return (
    <Dialog
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <Dialog.Trigger asChild>
        <Button>Excel ile Kullanıcı Ekle</Button>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>Excel ile Kullanıcı Ekle</Dialog.Title>
          <Dialog.Description>Excel dosyasını seçin ve kullanıcıları eklemek için tıklayın. Örnek dosyadaki formatta içerik yükleyiniz.</Dialog.Description>
        </Dialog.Header>
        <a
          className="bg-accent/50 hover:bg-accent/80 w-full gap-4 rounded-md p-2"
          download="ornek-kullanici-listesi.xlsx"
          href="/assets/ornek-kullanici-listesi.xlsx"
        >
          <div className="relative flex items-center gap-2">
            <Icon
              name="file-excel"
              className="size-10"
            />
            <div className="flex flex-col gap-1">
              <span className="text-xs font-medium">ornek-kullanici-listesi.xlsx</span>
              <span className="text-muted-foreground text-xs">0.5 KB</span>
            </div>
            <Icon
              name="download"
              className="absolute right-1 top-1 size-5"
            />
          </div>
          <span className="text-muted-foreground text-xs">
            Dosyada sadece <strong>"username"</strong> ve <strong>"name"</strong> alanları bulunmalıdır; her bir satır bir kişiyi ifade etmelidir.
          </span>
        </a>

        <Dialog.Footer>
          <UploadProvider
            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            onChange={async file => {
              const fileBuffer = await file.arrayBuffer();
              const response = await window.electronAPI.bulkCreateUsersFromExcel(fileBuffer);

              if (!response.success) {
                throw response.error;
              }

              toast.success(response.data);
              queryClient.invalidateQueries({ queryKey: [queryKeys.paginatedUserListQuery] });
              setIsOpen(false);
            }}
          >
            <Button type="button">Excel ile Kullanıcı Ekle</Button>
          </UploadProvider>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  );
}

export default AddUserBulk;
