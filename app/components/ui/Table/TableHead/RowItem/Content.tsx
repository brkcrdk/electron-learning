import { ReactNode } from 'react';

import { SortDirection } from '@tanstack/react-table';

import Icon from '@/components/ui/Icon';
import { IconListProps } from '@/types/IconListProps';

const sortIconName: Record<string, IconListProps> = {
  asc: 'arrowUp',
  desc: 'arrowDown',
};

interface Props {
  content: ReactNode;
  columnIsSorted: false | SortDirection;
}
function Content({ content, columnIsSorted }: Props) {
  return (
    <span className="relative flex items-center">
      {content}
      <Icon
        name={columnIsSorted ? sortIconName[columnIsSorted] : 'arrowUp'}
        className="absolute -right-5 hidden size-4 group-data-sortable/th:group-hover/th:flex group-data-sorted/th:flex"
      />
    </span>
  );
}
export default Content;
