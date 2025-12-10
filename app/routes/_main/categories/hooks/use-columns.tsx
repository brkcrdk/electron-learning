import type { ColumnDef } from '@tanstack/react-table';

import RelativeDateCell from '@app/components/table-cells/relative-date-cell';
import type { Category } from '@db/schema';

function useColumns(): ColumnDef<Category>[] {
  return [
    {
      header: 'Adı',
      accessorKey: 'name',
    },
    {
      header: 'Açıklama',
      accessorKey: 'description',
    },
    {
      header: 'Oluşturulma Tarihi',
      accessorKey: 'createdAt',
      cell: info => info.getValue(),
      accessorFn: ({ createdAt }) => {
        return <RelativeDateCell date={createdAt} />;
      },
      meta: {
        centeredColumn: true,
      },
    },
    {
      header: 'Son Güncellenme Tarihi',
      accessorKey: 'lastLoginAt',
      cell: info => info.getValue(),
      accessorFn: ({ updatedAt }) => {
        return <RelativeDateCell date={updatedAt} />;
      },
      meta: {
        centeredColumn: true,
      },
    },
  ];
}

export default useColumns;
