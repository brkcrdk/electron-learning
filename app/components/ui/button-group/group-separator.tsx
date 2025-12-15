import type { ComponentProps } from 'react';

import cn from '@app/utils/cn';

import Separator from '../separator';

interface Props extends ComponentProps<typeof Separator> {
  orientation?: 'vertical' | 'horizontal';
}

function GroupSeparator({ className, orientation = 'vertical', ...props }: Props) {
  return (
    <Separator
      data-slot="group-separator"
      orientation={orientation}
      className={cn('bg-input m-0! relative self-stretch data-[orientation=vertical]:h-auto', className)}
      {...props}
    />
  );
}

export default GroupSeparator;
