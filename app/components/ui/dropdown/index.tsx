import { DropdownMenu } from 'radix-ui';

import DropdownContent from './dropdown-content';
import DropdownItem from './dropdown-item';
import DropdownLabel from './dropdown-label';
import DropdownPortal from './dropdown-portal';
import DropdownSeparator from './dropdown-separator';
import DropdownSubContent from './dropdown-sub-content';
import DropdownSub from './dropdown-sub-menu';
import DropdownSubTrigger from './dropdown-sub-trigger';
import DropdownTrigger from './dropdown-trigger';

function Dropdown({ ...props }: DropdownMenu.DropdownMenuProps) {
  return (
    <DropdownMenu.Root
      data-slot="dropdown-menu"
      {...props}
    />
  );
}

Dropdown.Content = DropdownContent;
Dropdown.Item = DropdownItem;
Dropdown.Trigger = DropdownTrigger;
Dropdown.Separator = DropdownSeparator;
Dropdown.Label = DropdownLabel;
Dropdown.Sub = DropdownSub;
Dropdown.SubTrigger = DropdownSubTrigger;
Dropdown.SubContent = DropdownSubContent;
Dropdown.Portal = DropdownPortal;
export default Dropdown;
