import type { ComponentProps } from 'react';

import { Drawer } from 'vaul';

function DrawerTrigger({ ...props }: ComponentProps<typeof Drawer.Trigger>) {
  return (
    <Drawer.Trigger
      data-slot="drawer-trigger"
      {...props}
    />
  );
}

export default DrawerTrigger;
