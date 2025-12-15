import Checkbox from '../checkbox';
import Collapsible from '../collapsible';
import Command from '../command';
import Icon from '../icon';

import type { TreeItem } from '.';

interface Props {
  item: TreeItem;
  onSelect?: (value: TreeItem) => void;
  selectedValue: TreeItem | null;
}

const TreeNode = ({ item, onSelect, selectedValue }: Props) => {
  return (
    <Collapsible>
      <div className="flex items-center justify-between">
        <Command.Item
          value={String(item.id)}
          className="data-[selected=true]:bg-accent/50 flex w-full items-center"
          onSelect={() => {
            if (onSelect) {
              onSelect(item);
            }
          }}
        >
          <Checkbox checked={selectedValue ? selectedValue.id === item.id : false} />
          <span>{item.name}</span>
        </Command.Item>
        {item.children && item.children.length > 0 && (
          <Collapsible.Trigger className="z-10 data-[state=open]:rotate-90">
            <Icon name="chevron-right" />
          </Collapsible.Trigger>
        )}
      </div>
      {item.children && (
        <Collapsible.Content className="border-accent ml-4 border-l pl-3">
          {item.children.map(child => (
            <TreeNode
              key={child.id}
              item={child}
              onSelect={onSelect}
              selectedValue={selectedValue}
            />
          ))}
        </Collapsible.Content>
      )}
    </Collapsible>
  );
};

export default TreeNode;
