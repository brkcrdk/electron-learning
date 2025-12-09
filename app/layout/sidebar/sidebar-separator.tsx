import type { ComponentProps } from 'react';

import Separator from '@app/components/ui/separator';
import cn from '@app/utils/cn';

function SidebarSeparator({ className, ...props }: ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="sidebar-separator"
      data-sidebar="separator"
      className={cn('bg-sidebar-border mx-2 w-auto', className)}
      {...props}
    />
  );
}

export default SidebarSeparator;
