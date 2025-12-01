// import Button from '../Button';
// import Dropdown from '../Dropdown';
// import Pagination from '../Pagination';

import Dropdown from '../dropdown';
import Icon from '../icon';
import Pagination from '../pagination';

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
      <footer className="flex items-center justify-between">
        {limit && (
          <Dropdown
            contentProps={{
              align: 'start',
              alignOffset: -20,
            }}
            triggerProps={{
              className: 'btn btn-base text-base justify-self-start',
              children: (
                <>
                  {limit}
                  <Icon name="chevron-down" />
                </>
              ),
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
        <Pagination
          rootProps={{
            className: 'justify-self-end',
          }}
          totalPages={pageCount}
          currentPage={page}
          onPageChange={selectedPage => onPaginationChange(selectedPage)}
        />
      </footer>
    );
  }

  return null;
}
export default TableFooter;
