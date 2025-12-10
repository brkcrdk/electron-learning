import type { ComponentProps } from 'react';

import { Drawer } from 'vaul';

import Button from '../button';

function DrawerTrigger(props: ComponentProps<typeof Button>) {
  return (
    <Drawer.Trigger
      data-slot="drawer-trigger"
      asChild
    >
      <Button {...props} />
    </Drawer.Trigger>
  );
}

export default DrawerTrigger;
