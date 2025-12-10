import type { PropsWithChildren } from 'react';

import AlertDialog from './ui/alert-dialog';

interface Props extends PropsWithChildren {
  title: string;
  description: string;
  onConfirm: () => void;
}
function ConfirmModal({ title, description, onConfirm, children }: Props) {
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
          <AlertDialog.Action onClick={onConfirm}>Onayla</AlertDialog.Action>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog>
  );
}

export default ConfirmModal;
