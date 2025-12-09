import type { ComponentProps } from 'react';

import cn from '@app/utils/cn';

function FieldGroup({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="field-group"
      className={cn(
        'group/field-group @container/field-group flex w-full flex-col gap-7 data-[slot=checkbox-group]:gap-3',
        '*:data-[slot=field-group]:gap-4',
        className
      )}
      {...props}
    />
  );
}

export default FieldGroup;
