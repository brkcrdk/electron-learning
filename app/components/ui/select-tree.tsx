import Badge from './badge';
import Icon from './icon';
import Popover from './popover';
import TreeView, { type TreeItem } from './tree-view';

interface Props {
  treeData: TreeItem[];
  selectedValue: string | null;
}

function SelectTree({ treeData, selectedValue }: Props) {
  return (
    <Popover modal>
      <Popover.Trigger className="bg-input/50 hover:bg-input/80 flex items-center justify-between rounded-md p-2">
        {selectedValue ? <Badge variant="secondary">{selectedValue}</Badge> : <span className="text-muted-foreground text-sm">Seçiniz...</span>}
        <Icon
          name="chevron-down"
          className="size-4"
        />
      </Popover.Trigger>

      <Popover.Content className="w-(--radix-popover-trigger-width) p-0">
        <TreeView treeData={treeData} />
      </Popover.Content>
    </Popover>
  );
}

export default SelectTree;
