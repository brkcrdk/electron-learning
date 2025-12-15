import { Collapsible as CollapsiblePrimitive } from 'radix-ui';

import CollapsibleContent from './collapsible-content';
import CollapsibleTrigger from './colllapsible-trigger';

function Collapsible({ ...props }: CollapsiblePrimitive.CollapsibleProps) {
  return (
    <CollapsiblePrimitive.Root
      data-slot="collapsible"
      {...props}
    />
  );
}

Collapsible.Trigger = CollapsibleTrigger;
Collapsible.Content = CollapsibleContent;
export default Collapsible;
