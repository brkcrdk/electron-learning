import TableSearchBar, { type TableSearchProps } from './table-search-bar';
import type { TableActionsProps } from '../table-types';
import TableActions from './table-actions';

interface TableHeaderProps {
  tableTitle?: string;
  searchProps?: TableSearchProps;
  tableActions?: TableActionsProps[];
}

function TableHeader({ tableTitle, searchProps, tableActions }: TableHeaderProps) {
  return (
    <header className="flex flex-col gap-4">
      {tableTitle && <h1 className="text-2xl font-medium">{tableTitle}</h1>}
      {(searchProps || tableActions) && (
        <div className="flex items-center justify-between gap-2">
          {searchProps && (
            <TableSearchBar
              value={searchProps.value}
              placeholder={searchProps.placeholder}
              onSearch={searchProps.onSearch}
            />
          )}
          {tableActions && tableActions.length > 0 ? <TableActions actions={tableActions} /> : null}
        </div>
      )}
    </header>
  );
}
export default TableHeader;
