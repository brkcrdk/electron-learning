import type { PropsWithChildren } from 'react';

import { Dialog } from 'radix-ui';

import cn from '@app/utils/cn';

import DrawerHeader from './header';

interface Props extends PropsWithChildren {
  triggerProps?: Dialog.DialogTriggerProps;
  rootProps?: Dialog.DialogProps;
}
function Drawer({ triggerProps, children }: Props) {
  return (
    <Dialog.Root>
      <Dialog.Trigger
        {...triggerProps}
        className={cn('btn', triggerProps?.className)}
      />
      <Dialog.Portal>
        <Dialog.Overlay className="z-popover-overlay bg-base-300/60 fixed inset-0" />
        <Dialog.Content
          className={cn(
            'z-popover-content webkit-no-draggable max-w-120 bg-base-200 rounded-lg p-4 shadow-2xl',
            'border-base-content/20 border',
            'absolute right-2 top-2 h-[calc(100vh-1rem)] w-1/2',
            'data-[state=open]:animate-slide-in-right data-[state=closed]:animate-slide-out-right'
          )}
        >
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

Drawer.Header = DrawerHeader;
export default Drawer;
