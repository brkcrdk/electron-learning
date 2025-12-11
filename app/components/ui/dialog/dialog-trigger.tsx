import { Dialog } from 'radix-ui';

function DialogTrigger(props: Dialog.DialogTriggerProps) {
  return (
    <Dialog.Trigger
      data-slot="dialog-trigger"
      {...props}
    />
  );
}

export default DialogTrigger;
