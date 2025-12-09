import type { ComponentProps } from 'react';

import cn from '@app/utils/cn';

function FieldDescription({ className, ...props }: ComponentProps<'p'>) {
  return (
    <p
      data-slot="field-description"
      className={cn(
        'text-muted-foreground text-sm font-normal leading-normal',
        'group-has-data-[-orientation=horizontal]/field:text-balance',
        'nth-last-2:-mt-1 data-[variant=legend]+&:-mt-1.5 last:mt-0',
        '[&>a:hover]:text-primary [&>a]:underline [&>a]:underline-offset-4',
        className
      )}
      {...props}
    />
  );
}

export default FieldDescription;
