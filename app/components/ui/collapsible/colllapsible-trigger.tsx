import { Collapsible } from 'radix-ui';

function CollapsibleTrigger({ ...props }: Collapsible.CollapsibleTriggerProps) {
  return (
    <Collapsible.CollapsibleTrigger
      data-slot="collapsible-trigger"
      {...props}
    />
  );
}

export default CollapsibleTrigger;
