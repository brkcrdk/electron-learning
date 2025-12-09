import type { ReactNode } from 'react';

import { type SortDirection } from '@tanstack/react-table';

import Icon from '@app/components/ui/icon';
import type { IconListProps } from '@app/components/ui/icon/icon-list';

const sortIconName: Record<string, IconListProps> = {
  asc: 'arrow-up',
  desc: 'arrow-down',
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
        name={columnIsSorted ? sortIconName[columnIsSorted] : 'arrow-up'}
        className="group-data-sortable/th:group-hover/th:flex group-data-sorted/th:flex absolute -right-5 hidden size-4"
      />
    </span>
  );
}
export default Content;
