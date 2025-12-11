import { Dialog } from 'radix-ui';

import cn from '@app/utils/cn';

function DialogTitle({ className, ...props }: Dialog.DialogTitleProps) {
  return (
    <Dialog.Title
      data-slot="dialog-title"
      className={cn('text-lg font-semibold leading-none', className)}
      {...props}
    />
  );
}

export default DialogTitle;
