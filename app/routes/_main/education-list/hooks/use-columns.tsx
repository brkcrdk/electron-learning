import type { ColumnDef } from '@tanstack/react-table';

import RelativeDateCell from '@app/components/table-cells/relative-date-cell';
import UserCell from '@app/components/table-cells/user-cell';
import type { EducationListItem } from '@db/schema';

import EducationActions from '../modules/education-actions';

function useColumns(): ColumnDef<EducationListItem>[] {
  return [
    {
      header: 'Eğitim Adı',
      accessorKey: 'name',
    },
    {
      header: 'Açıklama',
      accessorKey: 'description',
      cell: info => info.getValue(),
      accessorFn: ({ description }) => {
        return <span className="line-clamp-1 max-w-80">{description}</span>;
      },
    },
    {
      header: 'Kategori',
      accessorKey: 'category',
      cell: info => info.getValue(),
      accessorFn: ({ category }) => {
        return <span className="line-clamp-1">{category.name}</span>;
      },
      meta: {
        centeredColumn: true,
      },
    },
    {
      header: 'Oluşturan',
      accessorKey: 'createdBy',
      cell: info => info.getValue(),
      accessorFn: ({ createdBy }) => {
        return <UserCell user={createdBy} />;
      },
      meta: {
        centeredColumn: true,
      },
    },
    {
      header: 'Oluşturma Tarihi',
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
      accessorKey: 'updatedAt',
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
      accessorFn: education => {
        return <EducationActions education={education} />;
      },
      enableSorting: false,
      meta: {
        centeredColumn: true,
      },
    },
  ];
}

export default useColumns;
