import { ToolbarActionProps } from '@/types/ToolbarActionProps';

import ActionsToolbar from '../../ActionsToolbar';

import TableSearchBar, { TableSearchProps } from './TableSearchBar';

interface TableHeaderProps {
  tableTitle?: string;
  searchProps?: TableSearchProps;
  tableActions?: ToolbarActionProps[];
}

function TableHeader({ tableTitle, tableActions, searchProps }: TableHeaderProps) {
  return (
    <header className="flex h-fit items-center justify-between gap-4">
      {tableTitle && <h3 className="text-3xl font-bold">{tableTitle}</h3>}
      {searchProps && (
        <TableSearchBar
          onSearch={searchProps.onSearch}
          value={searchProps.value}
          placeholder={searchProps.placeholder}
        />
      )}
      {tableActions && tableActions.length > 0 ? <ActionsToolbar actions={tableActions} /> : null}
    </header>
  );
}
export default TableHeader;
