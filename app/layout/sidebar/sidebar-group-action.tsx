import type { ComponentProps } from 'react';

import { Slot } from 'radix-ui';

import cn from '@app/utils/cn';

interface Props extends ComponentProps<'button'> {
  asChild?: boolean;
}

function SidebarGroupAction({ className, asChild = false, ...props }: Props) {
  const Comp = asChild ? Slot.Root : 'button';

  return (
    <Comp
      data-slot="sidebar-group-action"
      data-sidebar="group-action"
      className={cn(
        'text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground outline-hidden absolute right-3 top-3.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 transition-transform focus-visible:ring-2',
        '[&>svg]:size-4 [&>svg]:shrink-0',
        'group-data-[collapsible=icon]:hidden',
        className
      )}
      {...props}
    />
  );
}

export default SidebarGroupAction;
