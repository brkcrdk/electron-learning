import type { ComponentProps } from 'react';

import cn from '@app/utils/cn';

function SidebarInset({ className, ...props }: ComponentProps<'main'>) {
  return (
    <main
      data-slot="sidebar-inset"
      className={cn(
        'bg-background relative flex w-full flex-1 flex-col',
        'peer-data-[variant=inset]:m-2 peer-data-[variant=inset]:ml-0 peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2 peer-data-[variant=inset]:rounded-xl peer-data-[variant=inset]:shadow-sm',
        className
      )}
      {...props}
    />
  );
}

export default SidebarInset;
