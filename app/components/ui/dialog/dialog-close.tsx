import { Dialog } from 'radix-ui';

function DialogClose({ ...props }: Dialog.DialogCloseProps) {
  return (
    <Dialog.Close
      data-slot="dialog-close"
      {...props}
    />
  );
}

export default DialogClose;
