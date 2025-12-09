import type { ComponentProps } from 'react';

import cn from '@app/utils/cn';

function TableRow({ className, ...props }: ComponentProps<'tr'>) {
  return (
    <tr
      data-slot="table-row"
      className={cn('hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors', className)}
      {...props}
    />
  );
}

export default TableRow;
