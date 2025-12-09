import type { ComponentProps } from 'react';

import { Slot } from 'radix-ui';

import cn from '@app/utils/cn';

interface Props extends ComponentProps<'a'> {
  asChild?: boolean;
}
function BreadcrumbLink({ asChild, className, ...props }: Props) {
  const Comp = asChild ? Slot.Root : 'a';

  return (
    <Comp
      data-slot="breadcrumb-link"
      className={cn('hover:text-foreground transition-colors', className)}
      {...props}
    />
  );
}

export default BreadcrumbLink;
