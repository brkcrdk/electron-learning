import type { ColumnDef } from '@tanstack/react-table';

import RelativeDateCell from '@app/components/table-cells/relative-date-cell';
import type { CategoryWithChildren } from '@db/schema';

import CategoryActions from '../modules/category-actions';

function useColumns(): ColumnDef<CategoryWithChildren>[] {
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
    {
      header: 'İşlemler',
      accessorKey: 'actions',
      cell: info => info.getValue(),
      accessorFn: category => {
        return <CategoryActions category={category} />;
      },
      enableSorting: false,
      meta: {
        centeredColumn: true,
      },
    },
  ];
}

export default useColumns;
