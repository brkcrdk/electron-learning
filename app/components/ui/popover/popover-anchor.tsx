import { Popover } from 'radix-ui';

function PopoverAnchor({ ...props }: Popover.PopoverAnchorProps) {
  return (
    <Popover.Anchor
      data-slot="popover-anchor"
      {...props}
    />
  );
}

export default PopoverAnchor;
