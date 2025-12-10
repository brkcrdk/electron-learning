import { AlertDialog } from 'radix-ui';

function AlertPortal(props: AlertDialog.AlertDialogProps) {
  return (
    <AlertDialog.Portal
      data-slot="alert-dialog-portal"
      {...props}
    />
  );
}

export default AlertPortal;
