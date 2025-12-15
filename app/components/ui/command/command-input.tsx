import type { ComponentProps } from 'react';

import { Command } from 'cmdk';

import cn from '@app/utils/cn';

import Icon from '../icon';

function CommandInput({ className, ...props }: ComponentProps<typeof Command.Input>) {
  return (
    <div
      data-slot="command-input-wrapper"
      className="flex h-9 items-center gap-2 border-b px-3"
    >
      <Icon
        name="search"
        className="size-4 shrink-0 opacity-50"
      />
      <Command.Input
        data-slot="command-input"
        className={cn(
          'placeholder:text-muted-foreground outline-hidden flex h-10 w-full rounded-md bg-transparent py-3 text-sm disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        {...props}
      />
    </div>
  );
}
export default CommandInput;
