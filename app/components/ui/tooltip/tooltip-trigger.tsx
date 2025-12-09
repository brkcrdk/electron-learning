import { Tooltip } from 'radix-ui';

function TooltipTrigger({ ...props }: Tooltip.TooltipTriggerProps) {
  return (
    <Tooltip.Trigger
      data-slot="tooltip-trigger"
      {...props}
    />
  );
}

export default TooltipTrigger;
