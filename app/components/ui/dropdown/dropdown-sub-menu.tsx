import { DropdownMenu } from 'radix-ui';

function DropdownSubMenu({ ...props }: DropdownMenu.DropdownMenuSubProps) {
  return (
    <DropdownMenu.Sub
      data-slot="dropdown-menu-sub"
      {...props}
    />
  );
}

export default DropdownSubMenu;
