import { Popover } from 'radix-ui';

function PopoverTrigger({ ...props }: Popover.PopoverTriggerProps) {
  return (
    <Popover.Trigger
      data-slot="popover-trigger"
      {...props}
    />
  );
}

export default PopoverTrigger;
