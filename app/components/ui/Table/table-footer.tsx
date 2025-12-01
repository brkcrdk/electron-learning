// import Button from '../Button';
// import Dropdown from '../Dropdown';
// import Pagination from '../Pagination';

import Dropdown from '../dropdown';

export interface TablePaginationProps {
  page: number;
  pageCount: number;
  onPaginationChange: (selectedPage: number) => void;
  limit: number;
  onLimitChange: (value: number) => void;
}

function TableFooter({ page, pageCount, onPaginationChange, limit, onLimitChange }: TablePaginationProps) {
  if (pageCount > 1) {
    return (
      <footer className="grid grid-cols-2">
        {limit && (
          <Dropdown
            contentProps={{
              align: 'start',
              alignOffset: -20,
            }}
            triggerProps={{
              asChild: true,
              children: (
                // <Button
                //   styleVariant="secondary-light"
                //   rightIconProps={{ name: 'chevronDown', className: 'text-inherit' }}
                // >
                //   {limitProps.limit}
                // </Button>
                <button className="btn btn-sm btn-secondary-light">{limit}</button>
              ),
              className: 'justify-self-start',
            }}
            dropdownItems={[10, 20, 50, 100].map(limitOption => ({
              dropdownItemId: String(limitOption),
              itemType: 'default',
              itemProps: {
                children: limitOption,
                onClick: () => onLimitChange(limitOption),
              },
            }))}
          />
        )}
        {/* <Pagination
          rootProps={{
            className: 'justify-self-end',
          }}
          totalPages={paginationProps.pageCount}
          currentPage={paginationProps.page}
          onPageChange={selectedPage => paginationProps.onPaginationChange(selectedPage)}
        /> */}
      </footer>
    );
  }

  return null;
}
export default TableFooter;
