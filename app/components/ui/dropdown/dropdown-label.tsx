import { DropdownMenu } from 'radix-ui';

import cn from '@app/utils/cn';

interface Props extends DropdownMenu.DropdownMenuLabelProps {
  inset?: boolean;
}

function DropdownLabel({ className, inset, ...props }: Props) {
  return (
    <DropdownMenu.Label
      data-slot="dropdown-menu-label"
      data-inset={inset}
      className={cn('data-inset:pl-8 px-2 py-1.5 text-sm font-medium', className)}
      {...props}
    />
  );
}

export default DropdownLabel;
