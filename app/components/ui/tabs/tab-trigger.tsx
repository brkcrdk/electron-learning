import { Tabs } from 'radix-ui';

import cn from '@app/utils/cn';

function TabsTrigger({ className, ...props }: Tabs.TabsTriggerProps) {
  return (
    <Tabs.Trigger
      data-slot="tabs-trigger"
      className={cn(
        'text-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-md border border-transparent px-2 py-1 text-sm font-medium transition-[color,box-shadow]',
        'disabled:pointer-events-none disabled:opacity-50',
        'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring focus-visible:outline-1 focus-visible:ring-[3px]',
        'data-[state=active]:bg-background data-[state=active]:shadow-sm',
        'dark:text-muted-foreground',
        'dark:data-[state=active]:text-foreground dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30',
        "[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className
      )}
      {...props}
    />
  );
}
export default TabsTrigger;
