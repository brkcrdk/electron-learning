import { Tooltip } from 'radix-ui';

function TooltipProvider({ delayDuration = 0, ...props }: Tooltip.TooltipProviderProps) {
  return (
    <Tooltip.Provider
      data-slot="tooltip-provider"
      delayDuration={delayDuration}
      {...props}
    />
  );
}

export default TooltipProvider;
