import type { ComponentProps } from 'react';

import cn from '@app/utils/cn';

import Icon from '../icon';

function BreadcrumbEllipsis({ className, ...props }: ComponentProps<'span'>) {
  return (
    <span
      data-slot="breadcrumb-ellipsis"
      role="presentation"
      aria-hidden="true"
      className={cn('flex size-9 items-center justify-center', className)}
      {...props}
    >
      <Icon
        name="more-horizontal"
        className="size-4"
      />
      <span className="sr-only">More</span>
    </span>
  );
}

export default BreadcrumbEllipsis;
