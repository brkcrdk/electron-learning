import type { ComponentProps } from 'react';

import { Drawer } from 'vaul';

import cn from '@app/utils/cn';

function DrawerDescription({ className, ...props }: ComponentProps<typeof Drawer.Description>) {
  return (
    <Drawer.Description
      data-slot="drawer-description"
      className={cn('text-muted-foreground text-sm', className)}
      {...props}
    />
  );
}

export default DrawerDescription;
