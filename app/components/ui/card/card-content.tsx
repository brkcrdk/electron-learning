import type { ComponentProps } from 'react';

import cn from '@app/utils/cn';

function CardContent({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-content"
      className={cn('px-6', className)}
      {...props}
    />
  );
}
export default CardContent;
