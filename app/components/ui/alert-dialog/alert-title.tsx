import { AlertDialog } from 'radix-ui';

import cn from '@app/utils/cn';

function AlertTitle({ className, ...props }: AlertDialog.AlertDialogTitleProps) {
  return (
    <AlertDialog.Title
      data-slot="alert-dialog-title"
      className={cn('text-lg font-semibold', className)}
      {...props}
    />
  );
}

export default AlertTitle;
