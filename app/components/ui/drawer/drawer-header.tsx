import type { ComponentProps } from 'react';

import cn from '@app/utils/cn';

function DrawerHeader({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="drawer-header"
      className={cn(
        'flex flex-col gap-1.5 pb-8 pt-4 text-left',
        'group-data-[vaul-drawer-direction=bottom]/drawer-content:text-center',
        'group-data-[vaul-drawer-direction=top]/drawer-content:text-center',
        className
      )}
      {...props}
    />
  );
}

export default DrawerHeader;
