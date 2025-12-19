import type { ComponentProps } from 'react';

import { Drawer } from 'vaul';

import cn from '@app/utils/cn';

import DrawerOverlay from './drawer-overlay';
import DrawerPortal from './drawer-portal';

function DrawerContent({ className, children, ...props }: ComponentProps<typeof Drawer.Content>) {
  return (
    <DrawerPortal data-slot="drawer-portal">
      <DrawerOverlay className="webkit-no-draggable" />
      <Drawer.Content
        data-slot="drawer-content"
        className={cn(
          'group/drawer-content bg-background fixed z-50 flex h-auto max-h-[calc(100vh-1rem)] flex-col overflow-y-auto overflow-x-hidden rounded-lg p-4',
          'data-[vaul-drawer-direction=top]:inset-x-0 data-[vaul-drawer-direction=top]:top-0 data-[vaul-drawer-direction=top]:mb-24 data-[vaul-drawer-direction=top]:max-h-[80vh] data-[vaul-drawer-direction=top]:rounded-b-lg data-[vaul-drawer-direction=top]:border-b',
          'data-[vaul-drawer-direction=bottom]:inset-x-0 data-[vaul-drawer-direction=bottom]:bottom-0 data-[vaul-drawer-direction=bottom]:mt-24 data-[vaul-drawer-direction=bottom]:max-h-[80vh] data-[vaul-drawer-direction=bottom]:rounded-t-lg data-[vaul-drawer-direction=bottom]:border-t',
          'data-[vaul-drawer-direction=right]:inset-y-2 data-[vaul-drawer-direction=right]:right-2 data-[vaul-drawer-direction=right]:w-3/4 data-[vaul-drawer-direction=right]:border data-[vaul-drawer-direction=right]:sm:max-w-md',
          'data-[vaul-drawer-direction=left]:inset-y-0 data-[vaul-drawer-direction=left]:left-0 data-[vaul-drawer-direction=left]:w-3/4 data-[vaul-drawer-direction=left]:border-r data-[vaul-drawer-direction=left]:sm:max-w-md',
          className
        )}
        {...props}
      >
        <div className="bg-muted mx-auto mt-4 hidden h-2 w-[100px] shrink-0 rounded-full group-data-[vaul-drawer-direction=bottom]/drawer-content:block" />
        {children}
      </Drawer.Content>
    </DrawerPortal>
  );
}

export default DrawerContent;
