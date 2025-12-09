import type { ComponentProps } from 'react';

import cn from '@app/utils/cn';

function BreadcrumbList({ className, ...props }: ComponentProps<'ol'>) {
  return (
    <ol
      data-slot="breadcrumb-list"
      className={cn('text-muted-foreground wrap-break-word flex flex-wrap items-center gap-1.5 text-sm sm:gap-2.5', className)}
      {...props}
    />
  );
}

export default BreadcrumbList;
