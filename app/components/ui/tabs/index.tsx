import { Tabs as TabsPrimitive } from 'radix-ui';

import cn from '@app/utils/cn';

import TabsContent from './tab-content';
import TabsList from './tab-list';
import TabsTrigger from './tab-trigger';

function Tabs({ className, ...props }: TabsPrimitive.TabsProps) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn('flex flex-col gap-2', className)}
      {...props}
    />
  );
}

Tabs.List = TabsList;
Tabs.Trigger = TabsTrigger;
Tabs.Content = TabsContent;
export default Tabs;
