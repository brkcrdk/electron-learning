import { type Table, flexRender } from '@tanstack/react-table';

import cd from '../../../utils/cd';
import cn from '../../../utils/cn';

interface Props<T> {
  table: Table<T>;
}

function TableBody<T>({ table }: Props<T>) {
  /**
   * NOTE: Table instance'ını react-compiler optimize ettiği için `row selection` işlemlerindeki
   * güncellemelerde row checkboxları güncellenmiyordu. React-compilerı bu tablo bodysi için optimize
   * etmekten çıkartıyoruz. Böylece selection işlemlerinden sonra ui istediğimiz tepkiyi verebiliyor.
   */
  'use no memo';

  return (
    <tbody>
      {table.getRowModel().rows.map(row => (
        <tr
          key={row.id}
          data-selected={cd(row.getIsSelected())}
          className="group/tr hover:bg-base-300"
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
                className={cn(meta?.className)}
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
