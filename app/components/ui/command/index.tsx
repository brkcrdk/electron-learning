import type { ComponentProps } from 'react';

import { Command as CommandPrimitive } from 'cmdk';

import cn from '@app/utils/cn';

import CommandDialog from './command-dialog';
import CommandEmpty from './command-empty';
import CommandGroup from './command-group';
import CommandInput from './command-input';
import CommandItem from './command-item';
import CommandList from './command-list';
import CommandSeparator from './command-separator';
import CommandShortcut from './command-shortcut';

function Command({ className, ...props }: ComponentProps<typeof CommandPrimitive>) {
  return (
    <CommandPrimitive
      data-slot="command"
      className={cn('bg-popover text-popover-foreground flex h-full w-full flex-col overflow-hidden rounded-md', className)}
      {...props}
    />
  );
}

Command.Dialog = CommandDialog;
Command.Empty = CommandEmpty;
Command.Group = CommandGroup;
Command.Input = CommandInput;
Command.Item = CommandItem;
Command.List = CommandList;
Command.Separator = CommandSeparator;
Command.Shortcut = CommandShortcut;
export default Command;
