import { Fragment } from 'react';

import { type Table as TableType, flexRender } from '@tanstack/react-table';

import Table from '@app/components/ui/table';
import cd from '@app/utils/cd';
import cn from '@app/utils/cn';

import Button from '../ui/button';
import Icon from '../ui/icon';

interface Props<T> {
  table: TableType<T>;
}

function TableBody<T>({ table }: Props<T>) {
  /**
   * NOTE: Table instance'ını react-compiler optimize ettiği için `row selection` işlemlerindeki
   * güncellemelerde row checkboxları güncellenmiyordu. React-compilerı bu tablo bodysi için optimize
   * etmekten çıkartıyoruz. Böylece selection işlemlerinden sonra ui istediğimiz tepkiyi verebiliyor.
   */
  'use no memo';

  return (
    <Table.Body>
      {table.getRowModel().rows.map(row => (
        <Fragment key={row.id}>
          <Table.Row
            data-selected={cd(row.getIsSelected())}
            className="group/tr"
          >
            {row.getVisibleCells().map((cell, index) => {
              const { meta } = table._getColumnDefs()[index];

              return (
                <Table.Cell
                  /**
                   * NOTE: align propertysi bir süre sonra geçersizleşecek bu nedenle ilerleyen
                   * zamanlarda bu davranışı stillendirme ile yapmak zorundayız.
                   *
                   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/td
                   */
                  align={meta?.centeredColumn ? 'center' : 'justify'}
                  key={cell.id}
                  style={{
                    left: cell.column.getIsPinned() === 'left' ? cell.column.getStart() : undefined,
                    width: cell.column.getSize(),
                    paddingLeft: index === 0 ? `${row.depth * 2}rem` : undefined,
                  }}
                  className={cn(meta?.className)}
                >
                  {row.getCanExpand() && index === 0 && (
                    <Button
                      size="icon-sm"
                      variant="ghost"
                      onClick={row.getToggleExpandedHandler()}
                    >
                      <Icon
                        name="chevron-right"
                        className="size-3.5"
                      />
                    </Button>
                  )}
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Table.Cell>
              );
            })}
          </Table.Row>
        </Fragment>
      ))}
    </Table.Body>
  );
}
export default TableBody;
