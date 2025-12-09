import type { ComponentProps } from 'react';

import cn from '@app/utils/cn';

function CardTitle({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-title"
      className={cn('font-semibold leading-none', className)}
      {...props}
    />
  );
}
export default CardTitle;
