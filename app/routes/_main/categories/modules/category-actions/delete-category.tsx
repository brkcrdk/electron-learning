import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import ConfirmModal from '@app/components/confirm-modal';
import Button from '@app/components/ui/button';
import Icon from '@app/components/ui/icon';

interface Props {
  categoryId: number;
}

function DeleteCategory({ categoryId }: Props) {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: () => {
      return window.electronAPI.deleteCategory(categoryId);
    },
    onSuccess: response => {
      if (response.success) {
        queryClient.invalidateQueries({ queryKey: ['category-list'] });
      } else {
        toast.error(response.error);
      }
    },
  });

  return (
    <ConfirmModal
      title="Kategoriyi silmek istediğinize emin misiniz?"
      description="Bu işlem geri alınamaz. Kategori ve verileri kalıcı olarak silinecektir."
      onConfirm={mutate}
      isPending={isPending}
    >
      <Button variant="destructive">
        <Icon
          name="trash"
          className="size-4"
        />
        Kategoriyi Sil
      </Button>
    </ConfirmModal>
  );
}

export default DeleteCategory;
