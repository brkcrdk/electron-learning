import { Dialog as DialogPrimitive } from 'radix-ui';

import DialogClose from './dialog-close';
import DialogContent from './dialog-content';
import DialogDescription from './dialog-description';
import DialogFooter from './dialog-footer';
import DialogHeader from './dialog-header';
import DialogOverlay from './dialog-overlay';
import DialogPortal from './dialog-portal';
import DialogTitle from './dialog-title';
import DialogTrigger from './dialog-trigger';

function Dialog({ ...props }: DialogPrimitive.DialogProps) {
  return (
    <DialogPrimitive.Root
      data-slot="dialog"
      {...props}
    />
  );
}

Dialog.Content = DialogContent;
Dialog.Header = DialogHeader;
Dialog.Footer = DialogFooter;
Dialog.Close = DialogClose;
Dialog.Title = DialogTitle;
Dialog.Description = DialogDescription;
Dialog.Trigger = DialogTrigger;
Dialog.Overlay = DialogOverlay;
Dialog.Portal = DialogPortal;
export default Dialog;
