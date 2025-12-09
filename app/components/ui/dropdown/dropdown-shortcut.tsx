import type { ComponentProps } from 'react';

import cn from '@app/utils/cn';

function DropdownShortcut({ className, ...props }: ComponentProps<'span'>) {
  return (
    <span
      data-slot="dropdown-menu-shortcut"
      className={cn('text-muted-foreground ml-auto text-xs tracking-widest', className)}
      {...props}
    />
  );
}

export default DropdownShortcut;
