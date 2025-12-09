import type { ComponentProps } from 'react';

import Input from '@app/components/ui/input';
import cn from '@app/utils/cn';

function SidebarInput({ className, ...props }: ComponentProps<typeof Input>) {
  return (
    <Input
      data-slot="sidebar-input"
      data-sidebar="input"
      className={cn('bg-background h-8 w-full shadow-none', className)}
      {...props}
    />
  );
}

export default SidebarInput;
