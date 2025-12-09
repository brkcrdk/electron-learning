import { useMemo } from 'react';
import type { ComponentProps, CSSProperties } from 'react';

import Skeleton from '@app/components/ui/skeleton';
import cn from '@app/utils/cn';

interface Props extends ComponentProps<'div'> {
  showIcon?: boolean;
}

function SidebarMenuSkeleton({ className, showIcon = false, ...props }: Props) {
  // Random width between 50 to 90%.
  const width = useMemo(() => {
    return `${Math.floor(Math.random() * 40) + 50}%`;
  }, []);

  return (
    <div
      data-slot="sidebar-menu-skeleton"
      data-sidebar="menu-skeleton"
      className={cn('flex h-8 items-center gap-2 rounded-md px-2', className)}
      {...props}
    >
      {showIcon && (
        <Skeleton
          className="size-4 rounded-md"
          data-sidebar="menu-skeleton-icon"
        />
      )}
      <Skeleton
        className="max-w-(--skeleton-width) h-4 flex-1"
        data-sidebar="menu-skeleton-text"
        style={
          {
            '--skeleton-width': width,
          } as CSSProperties
        }
      />
    </div>
  );
}

export default SidebarMenuSkeleton;
