import { Dialog } from 'radix-ui';

import cn from '@app/utils/cn';

function DialogDescription({ className, ...props }: Dialog.DialogDescriptionProps) {
  return (
    <Dialog.Description
      data-slot="dialog-description"
      className={cn('text-muted-foreground text-sm', className)}
      {...props}
    />
  );
}

export default DialogDescription;
