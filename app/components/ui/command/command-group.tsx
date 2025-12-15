import type { ComponentProps } from 'react';

import { Command } from 'cmdk';

import cn from '@app/utils/cn';

function CommandGroup({ className, ...props }: ComponentProps<typeof Command.Group>) {
  return (
    <Command.Group
      data-slot="command-group"
      className={cn(
        'text-foreground **:[[cmdk-group-heading]]:text-muted-foreground **:[[cmdk-group-heading]]:px-2 **:[[cmdk-group-heading]]:py-1.5 **:[[cmdk-group-heading]]:text-xs **:[[cmdk-group-heading]]:font-medium overflow-hidden p-1',
        className
      )}
      {...props}
    />
  );
}

export default CommandGroup;
