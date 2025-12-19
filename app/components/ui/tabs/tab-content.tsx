import { Tabs } from 'radix-ui';

import cn from '@app/utils/cn';

function TabsContent({ className, ...props }: Tabs.TabsContentProps) {
  return (
    <Tabs.Content
      data-slot="tabs-content"
      className={cn('flex-1 outline-none', className)}
      {...props}
    />
  );
}
export default TabsContent;
