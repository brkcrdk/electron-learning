import TableActions from './table-actions';
import TableSearchBar, { type TableSearchProps } from './table-search-bar';

import type { TableActionsProps } from '../table-types';

interface TableHeaderProps {
  tableTitle?: string;
  searchProps?: TableSearchProps;
  tableActions?: TableActionsProps[];
}

function TableHeader({ tableTitle, searchProps, tableActions }: TableHeaderProps) {
  return (
    <header className="flex h-fit items-center justify-between gap-4">
      {(tableTitle || searchProps) && (
        <div className="flex w-full items-center gap-4">
          {tableTitle && <h3 className="w-fit whitespace-nowrap text-xl font-medium">{tableTitle}</h3>}
          {searchProps && (
            <TableSearchBar
              value={searchProps.value}
              placeholder={searchProps.placeholder}
              onSearch={searchProps.onSearch}
            />
          )}
        </div>
      )}
      {tableActions && tableActions.length > 0 ? <TableActions actions={tableActions} /> : null}
    </header>
  );
}
export default TableHeader;
