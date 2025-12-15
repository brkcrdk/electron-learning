import type { ColumnDef } from '@tanstack/react-table';

import RelativeDateCell from '@app/components/table-cells/relative-date-cell';
import UserCell from '@app/components/table-cells/user-cell';
import Badge from '@app/components/ui/badge';
import ImageFallback from '@app/components/ui/image-fallback';
import getContentPath from '@app/utils/get-content-path';
import type { EducationListItem } from '@db/schema';

import EducationActions from '../modules/education-actions';

function useColumns(): ColumnDef<EducationListItem>[] {
  return [
    {
      header: 'Eğitim Adı',
      accessorKey: 'name',
      cell: info => info.getValue(),
      accessorFn: ({ name, coverImage }) => {
        return (
          <div className="flex items-center gap-2">
            <ImageFallback
              src={getContentPath(coverImage?.filePath)}
              className="relative aspect-video w-20 overflow-hidden rounded-sm object-cover"
            />
            <span className="line-clamp-1 max-w-80">{name}</span>
          </div>
        );
      },
    },
    {
      header: 'Kategori',
      accessorKey: 'category',
      cell: info => info.getValue(),
      accessorFn: ({ category }) => {
        return <Badge>{category.name}</Badge>;
      },
      size: 50,
      meta: {
        centeredColumn: true,
      },
    },
    {
      header: 'İçerik',
      accessorKey: 'educationMaterial',
      cell: info => info.getValue(),
      accessorFn: ({ educationMaterial }) => {
        return <Badge>{educationMaterial.name}</Badge>;
      },
      size: 50,
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
      header: 'İşlemler',
      accessorKey: 'actions',
      cell: info => info.getValue(),
      accessorFn: education => {
        return <EducationActions education={education} />;
      },
      enableSorting: false,
      size: 50,
      meta: {
        centeredColumn: true,
      },
    },
  ];
}

export default useColumns;
