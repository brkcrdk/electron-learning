import type { ComponentProps } from 'react';

import { Slot } from 'radix-ui';

import cn from '@app/utils/cn';

interface Props extends ComponentProps<'div'> {
  asChild?: boolean;
}

function GroupText({ className, asChild = false, ...props }: Props) {
  const Comp = asChild ? Slot.Root : 'div';

  return (
    <Comp
      className={cn(
        "bg-muted shadow-xs flex items-center gap-2 rounded-md border px-4 text-sm font-medium [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none",
        className
      )}
      {...props}
    />
  );
}

export default GroupText;
