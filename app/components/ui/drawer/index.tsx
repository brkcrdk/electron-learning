import type { ComponentProps } from 'react';

import { Drawer as DrawerPrimitive } from 'vaul';

import DrawerClose from './drawer-close';
import DrawerContent from './drawer-content';
import DrawerDescription from './drawer-description';
import DrawerFooter from './drawer-footer';
import DrawerHeader from './drawer-header';
import DrawerOverlay from './drawer-overlay';
import DrawerPortal from './drawer-portal';
import DrawerTitle from './drawer-title';
import DrawerTrigger from './drawer-trigger';

function Drawer({ direction = 'right', ...props }: ComponentProps<typeof DrawerPrimitive.Root>) {
  return (
    <DrawerPrimitive.Root
      data-slot="drawer"
      direction={direction}
      {...props}
    />
  );
}

Drawer.Content = DrawerContent;
Drawer.Description = DrawerDescription;
Drawer.Footer = DrawerFooter;
Drawer.Header = DrawerHeader;
Drawer.Overlay = DrawerOverlay;
Drawer.Portal = DrawerPortal;
Drawer.Title = DrawerTitle;
Drawer.Trigger = DrawerTrigger;
Drawer.Close = DrawerClose;
export default Drawer;
