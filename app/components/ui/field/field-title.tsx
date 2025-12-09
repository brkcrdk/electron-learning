import type { ComponentProps } from 'react';

import cn from '@app/utils/cn';

function FieldTitle({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="field-title"
      className={cn('flex w-fit items-center gap-2 text-sm font-medium leading-snug group-data-[disabled=true]/field:opacity-50', className)}
      {...props}
    />
  );
}

export default FieldTitle;
