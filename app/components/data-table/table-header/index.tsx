import TableActions, { type TableActionsProps } from './table-actions';
import TableSearchBar, { type TableSearchProps } from './table-search-bar';

interface TableHeaderProps {
  tableTitle?: string;
  searchProps?: TableSearchProps;
  tableActions?: TableActionsProps[];
}

function TableHeader({ tableTitle, searchProps, tableActions }: TableHeaderProps) {
  return (
    <header className="flex flex-col gap-4">
      {tableTitle && <h1 className="text-2xl font-medium">{tableTitle}</h1>}
      <div className="flex items-center justify-between">
        {searchProps ? (
          <TableSearchBar
            value={searchProps.value}
            placeholder={searchProps.placeholder}
            onSearch={searchProps.onSearch}
          />
        ) : (
          <span />
        )}
        {tableActions ? <TableActions actions={tableActions} /> : null}
      </div>
    </header>
  );
}
export default TableHeader;
