import { AlertDialog } from 'radix-ui';

import cn from '@app/utils/cn';

import { buttonVariants } from '../button';

function AlertCancel({ className, ...props }: AlertDialog.AlertDialogCancelProps) {
  return (
    <AlertDialog.Cancel
      className={cn(buttonVariants({ variant: 'outline' }), className)}
      {...props}
    />
  );
}

export default AlertCancel;
