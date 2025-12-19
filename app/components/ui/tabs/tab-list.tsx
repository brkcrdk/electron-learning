import { Tabs } from 'radix-ui';

import cn from '@app/utils/cn';

function TabsList({ className, ...props }: Tabs.TabsListProps) {
  return (
    <Tabs.List
      data-slot="tabs-list"
      className={cn('bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]', className)}
      {...props}
    />
  );
}
export default TabsList;
