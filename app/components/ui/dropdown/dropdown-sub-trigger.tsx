import { DropdownMenu } from 'radix-ui';

import cn from '@app/utils/cn';

import Icon from '../icon';

interface Props extends DropdownMenu.DropdownMenuSubTriggerProps {
  inset?: boolean;
}

function DropdownSubTrigger({ className, inset, children, ...props }: Props) {
  return (
    <DropdownMenu.SubTrigger
      data-slot="dropdown-menu-sub-trigger"
      data-inset={inset}
      className={cn(
        "focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground outline-hidden data-inset:pl-8 flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className
      )}
      {...props}
    >
      {children}
      <Icon
        name="chevron-right"
        className="ml-auto size-4"
      />
    </DropdownMenu.SubTrigger>
  );
}

export default DropdownSubTrigger;
