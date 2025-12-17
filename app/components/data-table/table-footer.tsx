import Button from '../ui/button';
import Dropdown from '../ui/dropdown';
import Icon from '../ui/icon';
import Pagination from '../ui/pagination';

export interface TablePaginationProps {
  page: number;
  pageCount: number;
  onPaginationChange: (selectedPage: number) => void;
  limit: number;
  onItemsPerPageChange: (value: number) => void;
}

const limitOptions = [10, 20, 50, 100];

interface Props {
  paginationProps: TablePaginationProps;
}

function TableFooter({ paginationProps }: Props) {
  const { page, pageCount, onPaginationChange, limit, onItemsPerPageChange } = paginationProps;

  return (
    <nav className="flex w-full items-center justify-between">
      {limit && (
        <Dropdown>
          <Dropdown.Trigger asChild>
            <Button
              variant="secondary"
              className="px-2"
              type="button"
            >
              {limit}
              <Icon
                name="chevron-down"
                className="size-4"
              />
            </Button>
          </Dropdown.Trigger>
          <Dropdown.Content>
            {limitOptions.map(limitOption => (
              <Dropdown.Item
                key={limitOption}
                onClick={() => onItemsPerPageChange(limitOption)}
              >
                {limitOption}
              </Dropdown.Item>
            ))}
          </Dropdown.Content>
        </Dropdown>
      )}
      <Pagination
        totalPages={pageCount}
        currentPage={page}
        onPageChange={selectedPage => onPaginationChange(selectedPage)}
      />
    </nav>
  );
}
export default TableFooter;
