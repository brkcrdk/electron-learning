import type { ComponentProps } from 'react';

import cn from '@app/utils/cn';

function TableCell({ className, ...props }: ComponentProps<'td'>) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        // Layout & Spacing
        'p-2',
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

export default TableCell;
