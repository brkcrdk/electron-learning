import type { ComponentProps } from 'react';

import Icon from '@app/components/ui/icon';
import cn from '@app/utils/cn';

function BreadcrumbSeparator({ children, className, ...props }: ComponentProps<'li'>) {
  return (
    <li
      data-slot="breadcrumb-separator"
      role="presentation"
      aria-hidden="true"
      className={cn('[&>svg]:size-3.5', className)}
      {...props}
    >
      {children ?? <Icon name="chevron-right" />}
    </li>
  );
}

export default BreadcrumbSeparator;
