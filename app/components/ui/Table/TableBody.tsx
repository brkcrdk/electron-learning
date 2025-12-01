import { Table, flexRender } from '@tanstack/react-table';

import cd from '@/utils/cd';
import cn from '@/utils/cn';

import { TableProps } from './MainTable';

interface Props<T> {
  table: Table<T>;
  onRowPointerEnter?: TableProps<T>['onRowPointerEnter'];
}

function TableBody<T>({ table, onRowPointerEnter }: Props<T>) {
  return (
    <tbody>
      {table.getRowModel().rows.map(row => (
        <tr
          key={row.id}
          data-selected={cd(row.getIsSelected())}
          className="group/tr"
          onPointerEnter={() => {
            if (onRowPointerEnter) {
              onRowPointerEnter(row);
            }
          }}
        >
          {row.getVisibleCells().map((cell, index) => {
            const { meta } = table._getColumnDefs()[index];

            return (
              <td
                /**
                 * NOTE: align propertysi bir süre sonra geçersizleşecek bu nedenle ilerleyen
                 * zamanlarda bu davranışı stillendirme ile yapmak zorundayız.
                 *
                 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/td
                 */
                align={meta?.centeredColumn ? 'center' : 'justify'}
                key={cell.id}
                data-pinned={cd(cell.column.getIsPinned() === 'left')}
                style={{
                  left: cell.column.getIsPinned() === 'left' ? cell.column.getStart() : undefined,
                  width: cell.column.getSize(),
                }}
                className={cn(
                  'group-hover/tr:bg-primaryLight/30 group-data-selected/tr:bg-primaryLight border-t border-gray-200 bg-white p-2 text-sm data-pinned:sticky data-pinned:z-10 data-pinned:opacity-90',
                  meta?.className
                )}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            );
          })}
        </tr>
      ))}
    </tbody>
  );
}
export default TableBody;
