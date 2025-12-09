import type { ComponentProps } from 'react';

import cn from '@app/utils/cn';

import TableBody from './table-body';
import TableCaption from './table-caption';
import TableCell from './table-cell';
import TableFooter from './table-footer';
import TableHead from './table-head';
import TableHeader from './table-header';
import TableRow from './table-row';

function Table({ className, ...props }: ComponentProps<'table'>) {
  return (
    <div
      data-slot="table-container"
      className="relative w-full overflow-x-auto"
    >
      <table
        data-slot="table"
        className={cn('w-full caption-bottom text-sm', className)}
        {...props}
      />
    </div>
  );
}

Table.Header = TableHeader;
Table.Body = TableBody;
Table.Footer = TableFooter;
Table.Head = TableHead;
Table.Row = TableRow;
Table.Cell = TableCell;
Table.Caption = TableCaption;
export default Table;
