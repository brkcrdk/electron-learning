import type { ComponentProps } from 'react';

import { Drawer } from 'vaul';

function DrawerClose({ ...props }: ComponentProps<typeof Drawer.Close>) {
  return (
    <Drawer.Close
      data-slot="drawer-close"
      {...props}
    />
  );
}

export default DrawerClose;
