import type { ComponentProps } from 'react';

import { Drawer } from 'vaul';

import cn from '@app/utils/cn';

function DrawerTitle({ className, ...props }: ComponentProps<typeof Drawer.Title>) {
  return (
    <Drawer.Title
      data-slot="drawer-title"
      className={cn('text-foreground font-semibold', className)}
      {...props}
    />
  );
}

export default DrawerTitle;
