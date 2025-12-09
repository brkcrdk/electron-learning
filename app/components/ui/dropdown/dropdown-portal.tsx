import { DropdownMenu } from 'radix-ui';

function DropdownMenuPortal(props: DropdownMenu.DropdownMenuPortalProps) {
  return (
    <DropdownMenu.Portal
      data-slot="dropdown-menu-portal"
      {...props}
    />
  );
}

export default DropdownMenuPortal;
