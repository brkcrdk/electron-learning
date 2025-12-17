import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import ConfirmModal from '@app/components/confirm-modal';
import Button from '@app/components/ui/button';
import Icon from '@app/components/ui/icon';
import queryKeys from '@app/services/query-keys';
import type { EducationListItem } from '@db/schema';

interface Props {
  educationId: EducationListItem['id'];
}

function DeleteEducation({ educationId }: Props) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: () => window.electronAPI.deleteEducation(educationId),
    onSuccess: response => {
      if (response.success) {
        queryClient.invalidateQueries({ queryKey: [queryKeys.educationListQuery] });
      } else {
        toast.error(response.error);
      }
    },
  });

  return (
    <ConfirmModal
      title="Eğitimi silmek istediğinize emin misiniz?"
      description="Bu işlem geri alınamaz. Eğitim ve verileri kalıcı olarak silinecektir."
      onConfirm={mutate}
      isPending={isPending}
    >
      <Button variant="destructive">
        <Icon
          name="trash"
          className="size-4"
        />
        Eğitimi Sil
      </Button>
    </ConfirmModal>
  );
}

export default DeleteEducation;
