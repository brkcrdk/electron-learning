import { AlertDialog } from 'radix-ui';

import cn from '@app/utils/cn';

function AlertDescription({ className, ...props }: AlertDialog.AlertDialogDescriptionProps) {
  return (
    <AlertDialog.Description
      data-slot="alert-dialog-description"
      className={cn('text-muted-foreground text-sm', className)}
      {...props}
    />
  );
}

export default AlertDescription;
