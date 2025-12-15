import Command from '../command';
import TreeNode from './tree-node';

export interface TreeItem {
  id: string;
  name: string;
  children?: TreeItem[];
}

interface Props {
  treeData: TreeItem[];
  onSelect: (value: string) => void;
  selectedValue: string | null;
}

function TreeView({ treeData, onSelect, selectedValue }: Props) {
  return (
    <Command>
      <Command.List>
        <Command.Empty>Sonuç bulunamadı.</Command.Empty>

        <Command.Group>
          {treeData.map(item => (
            <TreeNode
              key={item.id}
              item={item}
              onSelect={onSelect}
              selectedValue={selectedValue}
            />
          ))}
        </Command.Group>
      </Command.List>
    </Command>
  );
}

export default TreeView;
