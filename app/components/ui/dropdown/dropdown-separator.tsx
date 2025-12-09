import { DropdownMenu } from 'radix-ui';

import cn from '@app/utils/cn';

function DropdownSeparator({ className, ...props }: DropdownMenu.DropdownMenuSeparatorProps) {
  return (
    <DropdownMenu.Separator
      data-slot="dropdown-menu-separator"
      className={cn('bg-border -mx-1 my-1 h-px', className)}
      {...props}
    />
  );
}

export default DropdownSeparator;
