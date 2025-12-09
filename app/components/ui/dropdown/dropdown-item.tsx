import { DropdownMenu } from 'radix-ui';

import cn from '@app/utils/cn';

interface Props extends DropdownMenu.DropdownMenuItemProps {
  inset?: boolean;
  variant?: 'default' | 'destructive';
}

function DropdownItem({ className, inset, variant = 'default', ...props }: Props) {
  return (
    <DropdownMenu.Item
      data-slot="dropdown-menu-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(
        // Layout & Positioning
        'relative flex items-center gap-2 rounded-sm px-2 py-1.5',

        // Typography
        'cursor-default select-none text-sm',

        // Focus States
        'focus:bg-accent focus:text-accent-foreground outline-hidden',

        // Variant: Destructive
        'data-[variant=destructive]:text-destructive',
        'data-[variant=destructive]:focus:bg-destructive/10',
        'dark:data-[variant=destructive]:focus:bg-destructive/20',
        'data-[variant=destructive]:focus:text-destructive',
        'data-[variant=destructive]:*:[svg]:text-destructive!',

        // SVG Styling
        "[&_svg:not([class*='text-'])]:text-muted-foreground",
        "[&_svg:not([class*='size-'])]:size-4",
        '[&_svg]:pointer-events-none [&_svg]:shrink-0',

        // Disabled State
        'data-disabled:pointer-events-none data-disabled:opacity-50',

        // Inset Variant
        'data-inset:pl-8',

        className
      )}
      {...props}
    />
  );
}

export default DropdownItem;
