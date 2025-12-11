import { Dialog } from 'radix-ui';

function DialogPortal({ ...props }: Dialog.DialogPortalProps) {
  return (
    <Dialog.Portal
      data-slot="dialog-portal"
      {...props}
    />
  );
}

export default DialogPortal;
