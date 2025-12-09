import type { ComponentProps } from 'react';

import cn from '@app/utils/cn';

function CardFooter({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-footer"
      className={cn('[.border-t]:pt-6 flex items-center px-6', className)}
      {...props}
    />
  );
}
export default CardFooter;
