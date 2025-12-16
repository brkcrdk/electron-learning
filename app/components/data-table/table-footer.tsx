import Button from '../ui/button';
import Dropdown from '../ui/dropdown';
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

  if (pageCount > 1) {
    return (
      <nav className="flex w-full items-center justify-between">
        {limit && (
          <Dropdown>
            <Dropdown.Trigger asChild>
              <Button size="sm">{limit}</Button>
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

  return null;
}
export default TableFooter;
