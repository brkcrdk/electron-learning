import type { ComponentProps } from 'react';

import { Drawer } from 'vaul';

import cn from '@app/utils/cn';

function DrawerOverlay({ className, ...props }: ComponentProps<typeof Drawer.Overlay>) {
  return (
    <Drawer.Overlay
      data-slot="drawer-overlay"
      className={cn(
        'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50',
        className
      )}
      {...props}
    />
  );
}

export default DrawerOverlay;
