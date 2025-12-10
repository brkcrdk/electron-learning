import { AlertDialog } from 'radix-ui';

function AlertTrigger(props: AlertDialog.AlertDialogTriggerProps) {
  return (
    <AlertDialog.Trigger
      data-slot="alert-dialog-trigger"
      {...props}
    />
  );
}

export default AlertTrigger;
