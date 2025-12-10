import ConfirmModal from '@app/components/confirm-modal';
import Button from '@app/components/ui/button';
import Icon from '@app/components/ui/icon';

function DeleteUser() {
  return (
    <ConfirmModal
      title="Kullanıcıyı silmek istediğinize emin misiniz?"
      description="Bu işlem geri alınamaz. Kullanıcı ve verileri kalıcı olarak silinecektir."
      onConfirm={() => {}}
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
