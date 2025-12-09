import type { ComponentProps } from 'react';

import cn from '@app/utils/cn';

function TableHead({ className, ...props }: ComponentProps<'th'>) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        // Layout & Spacing
        'h-10 px-2',
        // Typography
        'text-foreground text-left font-medium',
        // Display
        'whitespace-nowrap align-middle',
        // Conditional styles
        '[&:has([role=checkbox])]:pr-0',
        '*:[[role=checkbox]]:translate-y-[2px]',
        className
      )}
      {...props}
    />
  );
}

export default TableHead;
