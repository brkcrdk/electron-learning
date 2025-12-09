import { DropdownMenu } from 'radix-ui';

function DropdownTrigger(props: DropdownMenu.DropdownMenuTriggerProps) {
  return (
    <DropdownMenu.Trigger
      data-slot="dropdown-menu-trigger"
      {...props}
    />
  );
}

export default DropdownTrigger;
