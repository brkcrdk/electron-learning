import { Dialog } from 'radix-ui';

import cn from '@app/utils/cn';

import DialogOverlay from './dialog-overlay';
import DialogPortal from './dialog-portal';
import Icon from '../icon';

interface Props extends Dialog.DialogContentProps {
  showCloseButton?: boolean;
}

function DialogContent({ className, children, showCloseButton = true, ...props }: Props) {
  return (
    <DialogPortal data-slot="dialog-portal">
      <DialogOverlay />
      <Dialog.Content
        data-slot="dialog-content"
        className={cn(
          'bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 webkit-no-draggable fixed left-[50%] top-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg',
          className
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <Dialog.Close
            data-slot="dialog-close"
            className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground rounded-xs focus:outline-hidden absolute right-4 top-4 opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0"
          >
            <Icon name="close" />
            <span className="sr-only">Close</span>
          </Dialog.Close>
        )}
      </Dialog.Content>
    </DialogPortal>
  );
}
export default DialogContent;
