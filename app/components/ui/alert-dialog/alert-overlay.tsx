import { AlertDialog } from 'radix-ui';

import cn from '@app/utils/cn';

function AlertyOverlay({ className, ...props }: AlertDialog.AlertDialogOverlayProps) {
  return (
    <AlertDialog.Overlay
      data-slot="alert-dialog-overlay"
      className={cn(
        'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50',
        className
      )}
      {...props}
    />
  );
}

export default AlertyOverlay;
