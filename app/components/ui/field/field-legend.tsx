import type { ComponentProps } from 'react';

import cn from '@app/utils/cn';

interface Props extends ComponentProps<'legend'> {
  variant?: 'legend' | 'label';
}

function FieldLegend({ className, variant = 'legend', ...props }: Props) {
  return (
    <legend
      data-slot="field-legend"
      data-variant={variant}
      className={cn('mb-3 font-medium', 'data-[variant=legend]:text-base', 'data-[variant=label]:text-sm', className)}
      {...props}
    />
  );
}

export default FieldLegend;
