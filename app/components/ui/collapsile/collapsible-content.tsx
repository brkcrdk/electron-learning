import { Collapsible } from 'radix-ui';

function CollapsibleContent({ ...props }: Collapsible.CollapsibleContentProps) {
  return (
    <Collapsible.CollapsibleContent
      data-slot="collapsible-content"
      {...props}
    />
  );
}

export default CollapsibleContent;
