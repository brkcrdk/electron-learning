import * as TooltipPrimitive from '@radix-ui/react-tooltip';

import TooltipContent from './tooltip-content';
import TooltipProvider from './tooltip-provider';
import TooltipTrigger from './tooltip-trigger';

function Tooltip({ ...props }: React.ComponentProps<typeof TooltipPrimitive.Root>) {
  return (
    <TooltipProvider>
      <TooltipPrimitive.Root
        data-slot="tooltip"
        {...props}
      />
    </TooltipProvider>
  );
}

Tooltip.Trigger = TooltipTrigger;
Tooltip.Content = TooltipContent;
Tooltip.Provider = TooltipProvider;
export default Tooltip;
