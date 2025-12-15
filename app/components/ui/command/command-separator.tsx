import type { ComponentProps } from 'react';

import { Command } from 'cmdk';

import cn from '@app/utils/cn';

function CommandSeparator({ className, ...props }: ComponentProps<typeof Command.Separator>) {
  return (
    <Command.Separator
      data-slot="command-separator"
      className={cn('bg-border -mx-1 h-px', className)}
      {...props}
    />
  );
}

export default CommandSeparator;
