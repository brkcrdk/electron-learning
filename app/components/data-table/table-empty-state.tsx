import Icon from '@app/components/ui/icon';
import Table from '@app/components/ui/table';

export interface TableEmptyStateProps {
  tableColumnsCount: number;
  onClearFilters?: () => void;
  newItemProps?: {
    label: string;
    onAddNewItem: () => void;
  };
}

function TableEmptyState({ tableColumnsCount, onClearFilters, newItemProps }: TableEmptyStateProps) {
  return (
    <Table.Body>
      <Table.Row>
        <Table.Cell colSpan={tableColumnsCount}>
          <div className="bg-base-200">
            <div className="flex flex-col items-center justify-center px-4 py-20 text-center">
              <div className="flex max-w-md flex-col items-center justify-center">
                <Icon
                  name="folder-open-outline"
                  className="mb-6 size-10"
                />
                <h1 className="text-3xl font-semibold">Sonuç Bulunamadı.</h1>
                <p className="text-base-content/50 wrap-break-word py-6 font-medium">
                  Bu kriterlere uygun bir sonuç bulunamadı. Lütfen farklı bir kriter deneyiniz.
                </p>
                <div className="flex items-center justify-center gap-2">
                  {newItemProps && (
                    <button
                      className="btn btn-primary"
                      onClick={newItemProps.onAddNewItem}
                    >
                      {newItemProps.label}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Table.Cell>
      </Table.Row>
    </Table.Body>
  );
}
export default TableEmptyState;
