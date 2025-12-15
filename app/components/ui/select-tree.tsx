import type { ComponentProps } from 'react';

import Badge from './badge';
import Icon from './icon';
import Popover from './popover';
import TreeView from './tree-view';

function SelectTree(props: ComponentProps<typeof TreeView>) {
  return (
    <Popover modal>
      <Popover.Trigger className="bg-input/50 hover:bg-input/80 flex items-center justify-between rounded-md p-2">
        {props.selectedValue ? <Badge>{props.selectedValue.name}</Badge> : <span className="text-muted-foreground text-sm">Seçiniz...</span>}
        <Icon
          name="chevron-down"
          className="size-4"
        />
      </Popover.Trigger>

      <Popover.Content className="w-(--radix-popover-trigger-width) p-0">
        <TreeView {...props} />
      </Popover.Content>
    </Popover>
  );
}

export default SelectTree;
