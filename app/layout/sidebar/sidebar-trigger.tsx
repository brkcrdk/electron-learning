import type { ComponentProps } from 'react';

import Button from '@app/components/ui/button';
import Icon from '@app/components/ui/icon';
import cn from '@app/utils/cn';

import { useSidebar } from './sidebar-context';

function SidebarTrigger({ className, onClick, ...props }: ComponentProps<typeof Button>) {
  const { toggleSidebar } = useSidebar();

  return (
    <Button
      data-sidebar="trigger"
      data-slot="sidebar-trigger"
      variant="ghost"
      size="icon"
      className={cn('size-7', className)}
      onClick={event => {
        toggleSidebar();
        if (onClick) {
          onClick(event);
        }
      }}
      {...props}
    >
      <Icon name="sidebar-expand" />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  );
}

export default SidebarTrigger;
