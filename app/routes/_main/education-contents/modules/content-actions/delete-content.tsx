import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import ConfirmModal from '@app/components/confirm-modal';
import Button from '@app/components/ui/button';
import Icon from '@app/components/ui/icon';

interface Props {
  contentId: number;
}

function DeleteContent({ contentId }: Props) {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: () => {
      return window.electronAPI.deleteEducation(contentId);
    },
    onSuccess: response => {
      if (response.success) {
        queryClient.invalidateQueries({ queryKey: ['education-contents'] });
      } else {
        toast.error(response.error);
      }
    },
  });

  return (
    <ConfirmModal
      title="Eğitim İçeriğini silmek istediğinize emin misiniz?"
      description="Bu işlem geri alınamaz. Eğitim içeriği ve verileri kalıcı olarak silinecektir."
      onConfirm={mutate}
      isPending={isPending}
    >
      <Button variant="destructive">
        <Icon
          name="trash"
          className="size-4"
        />
        Eğitim İçeriğini Sil
      </Button>
    </ConfirmModal>
  );
}

export default DeleteContent;
