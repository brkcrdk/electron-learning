import type { PropsWithChildren } from 'react';

import AlertDialog from './ui/alert-dialog';
import Spinner from './ui/spinner';

interface Props extends PropsWithChildren {
  title: string;
  description: string;
  onConfirm: () => void;
  isPending?: boolean;
}
function ConfirmModal({ title, description, onConfirm, children, isPending }: Props) {
  return (
    <AlertDialog>
      <AlertDialog.Trigger asChild>{children}</AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Header>
          <AlertDialog.Title>{title}</AlertDialog.Title>
          <AlertDialog.Description>{description}</AlertDialog.Description>
        </AlertDialog.Header>
        <AlertDialog.Footer>
          <AlertDialog.Cancel>Vazgeç</AlertDialog.Cancel>
          <AlertDialog.Action
            onClick={onConfirm}
            disabled={isPending}
          >
            {isPending && <Spinner />}
            Onayla
          </AlertDialog.Action>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog>
  );
}

export default ConfirmModal;
