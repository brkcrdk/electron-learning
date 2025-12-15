import Command from '../command';
import TreeNode from './tree-node';

export interface TreeItem {
  id: string;
  name: string;
  children?: TreeItem[];
}

const treeData: TreeItem[] = [
  {
    id: '1',
    name: 'Item 1',
    children: [
      { id: '2', name: 'Item 1.1' },
      { id: '3', name: 'Item 1.2' },
    ],
  },
  {
    id: '4',
    name: 'Item 2',
    children: [
      { id: '5', name: 'Item 2.1' },
      {
        id: '6',
        name: 'Item 2.2',
        children: [
          { id: '7', name: 'Item 2.2.1' },
          { id: '8', name: 'Item 2.2.2' },
        ],
      },
    ],
  },
];

function TreeView() {
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
