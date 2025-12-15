import { Popover as PopoverPrimitive } from 'radix-ui';

import PopoverAnchor from './popover-anchor';
import PopoverContent from './popover-content';
import PopoverTrigger from './popover-trigger';

function Popover({ ...props }: PopoverPrimitive.PopoverProps) {
  return (
    <PopoverPrimitive.Root
      data-slot="popover"
      {...props}
    />
  );
}

Popover.Anchor = PopoverAnchor;
Popover.Content = PopoverContent;
Popover.Trigger = PopoverTrigger;
export default Popover;
