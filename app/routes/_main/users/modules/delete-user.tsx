import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import ConfirmModal from '@app/components/confirm-modal';
import Button from '@app/components/ui/button';
import Icon from '@app/components/ui/icon';

interface Props {
  userId: number;
}

function DeleteUser({ userId }: Props) {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: () => {
      return window.electronAPI.deleteUser(userId);
    },
    onSuccess: response => {
      if (response.success) {
        queryClient.invalidateQueries({ queryKey: ['user-list'] });
      } else {
        toast.error(response.error);
      }
    },
  });

  return (
    <ConfirmModal
      title="Kullanıcıyı silmek istediğinize emin misiniz?"
      description="Bu işlem geri alınamaz. Kullanıcı ve verileri kalıcı olarak silinecektir."
      onConfirm={mutate}
      isPending={isPending}
    >
      <Button
        variant="destructive"
        size="icon-sm"
      >
        <Icon
          name="trash"
          className="size-4"
        />
      </Button>
    </ConfirmModal>
  );
}

export default DeleteUser;
