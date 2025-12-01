import Button from '../Button';
import Dropdown from '../Dropdown';
import Pagination from '../Pagination';

export interface TablePaginationProps {
  page: number;
  pageCount: number;
  onPaginationChange: (selectedPage: number) => void;
}

export interface TableLimitProps {
  limit: number;
  onItemsPerPageChange: (value: number) => void;
}

interface Props {
  paginationProps?: TablePaginationProps;
  limitProps?: TableLimitProps;
}

function TableFooter({ limitProps, paginationProps }: Props) {
  if (paginationProps && paginationProps.pageCount > 1) {
    return (
      <footer className="grid grid-cols-2">
        {limitProps && (
          <Dropdown
            triggerProps={{
              asChild: true,
              children: (
                <Button
                  styleVariant="secondary-light"
                  rightIconProps={{ name: 'chevronDown', className: 'text-inherit' }}
                >
                  {limitProps.limit}
                </Button>
              ),
              className: 'justify-self-start',
            }}
            dropdownItems={[10, 20, 50, 100].map(limitOption => ({
              dropdownItemId: String(limitOption),
              itemType: 'default',
              itemProps: {
                children: limitOption,
                onClick: () => limitProps.onItemsPerPageChange(limitOption),
              },
            }))}
          />
        )}
        <Pagination
          rootProps={{
            className: 'justify-self-end',
          }}
          totalPages={paginationProps.pageCount}
          currentPage={paginationProps.page}
          onPageChange={selectedPage => paginationProps.onPaginationChange(selectedPage)}
        />
      </footer>
    );
  }

  return null;
}
export default TableFooter;
