import type { ComponentProps } from 'react';

import { Command } from 'cmdk';

import cn from '@app/utils/cn';

function CommandList({ className, ...props }: ComponentProps<typeof Command.List>) {
  return (
    <Command.List
      data-slot="command-list"
      className={cn('max-h-80 scroll-py-1 overflow-y-auto overflow-x-hidden', className)}
      {...props}
    />
  );
}

export default CommandList;
