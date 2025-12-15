import Command from '../command';
import TreeNode from './tree-node';

export interface TreeItem {
  id: string;
  name: string;
  children?: TreeItem[];
}

interface Props {
  treeData: TreeItem[];
}

function TreeView({ treeData }: Props) {
  return (
    <Command>
      <Command.List>
        <Command.Empty>Sonuç bulunamadı.</Command.Empty>

        <Command.Group>
          {treeData.map(item => (
            <TreeNode
              key={item.id}
              item={item}
            />
          ))}
        </Command.Group>
      </Command.List>
    </Command>
  );
}

export default TreeView;
