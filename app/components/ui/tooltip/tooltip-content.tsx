import { Tooltip } from 'radix-ui';

import cn from '@app/utils/cn';

function TooltipContent({ className, sideOffset = 0, children, ...props }: Tooltip.TooltipContentProps) {
  return (
    <Tooltip.Portal>
      <Tooltip.Content
        data-slot="tooltip-content"
        sideOffset={sideOffset}
        className={cn(
          'bg-foreground text-background animate-in fade-in-0 zoom-in-95 z-50 w-fit text-balance rounded-md px-3 py-1.5 text-xs',
          'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
          'origin-(--radix-tooltip-content-transform-origin)',
          'data-[side=left]:slide-in-from-right-2',
          'data-[side=bottom]:slide-in-from-top-2',
          'data-[side=right]:slide-in-from-left-2',
          'data-[side=top]:slide-in-from-bottom-2',
          className
        )}
        {...props}
      >
        {children}
        <Tooltip.Arrow className="bg-foreground fill-foreground z-50 size-2.5 translate-y-[calc(-50%-2px)] rotate-45 rounded-[2px]" />
      </Tooltip.Content>
    </Tooltip.Portal>
  );
}
export default TooltipContent;
