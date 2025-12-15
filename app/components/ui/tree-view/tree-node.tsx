import Checkbox from '../checkbox';
import Collapsible from '../collapsible';
import Command from '../command';
import Icon from '../icon';

import type { TreeItem } from '.';

interface Props {
  item: TreeItem;
}

const TreeNode = ({ item }: Props) => {
  return (
    <Collapsible>
      <Command.Item
        value={item.id}
        className="data-[selected=true]:bg-accent/30 flex items-center justify-between"
        onSelect={e => {
          console.log('selected', e);
        }}
      >
        <div className="flex items-center gap-2">
          <Checkbox />
          <span>{item.name}</span>
        </div>
        {item.children && item.children.length > 0 && (
          <Collapsible.Trigger className="data-[state=open]:rotate-90">
            <Icon name="chevron-right" />
          </Collapsible.Trigger>
        )}
      </Command.Item>
      {item.children && (
        <Collapsible.Content className="border-accent ml-4 border-l pl-3">
          {item.children.map(child => (
            <TreeNode
              key={child.id}
              item={child}
            />
          ))}
        </Collapsible.Content>
      )}
    </Collapsible>
  );
};

export default TreeNode;
