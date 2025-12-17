import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import ConfirmModal from '@app/components/confirm-modal';
import Button from '@app/components/ui/button';
import Icon from '@app/components/ui/icon';
import queryKeys from '@app/services/query-keys';
import type { EducationAssignmentListItem } from '@db/schema';

interface Props {
  assignmentId: EducationAssignmentListItem['id'];
}

function DeleteAssignment({ assignmentId }: Props) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: () => window.electronAPI.deleteEducationAssignment(assignmentId),
    onSuccess: response => {
      if (response.success) {
        queryClient.invalidateQueries({ queryKey: [queryKeys.educationAssignmentListQuery] });
      } else {
        toast.error(response.error);
      }
    },
  });

  return (
    <ConfirmModal
      title="Eğitim atamasını silmek istediğinize emin misiniz?"
      description="Bu işlem geri alınamaz. Eğitim ataması ve verileri kalıcı olarak silinecektir."
      onConfirm={mutate}
      isPending={isPending}
    >
      <Button variant="destructive">
        <Icon
          name="trash"
          className="size-4"
        />
        Eğitim Atamasını Sil
      </Button>
    </ConfirmModal>
  );
}

export default DeleteAssignment;
