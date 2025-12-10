import { AlertDialog } from 'radix-ui';

import cn from '@app/utils/cn';

import { buttonVariants } from '../button';

function AlertAction({ className, ...props }: AlertDialog.AlertDialogActionProps) {
  return (
    <AlertDialog.Action
      className={cn(buttonVariants(), className)}
      {...props}
    />
  );
}

export default AlertAction;
