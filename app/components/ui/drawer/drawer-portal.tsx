import type { ComponentProps } from 'react';

import { Drawer } from 'vaul';

function DrawerPortal(props: ComponentProps<typeof Drawer.Portal>) {
  return (
    <Drawer.Portal
      data-slot="drawer-portal"
      {...props}
    />
  );
}

export default DrawerPortal;
