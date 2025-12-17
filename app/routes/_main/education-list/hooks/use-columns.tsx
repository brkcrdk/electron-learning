import type { ColumnDef } from '@tanstack/react-table';

import MediaViewerCell from '@app/components/table-cells/media-viewer-cell';
import RelativeDateCell from '@app/components/table-cells/relative-date-cell';
import UserCell from '@app/components/table-cells/user-cell';
import Badge from '@app/components/ui/badge';
import type { EducationListItem } from '@db/schema';

import EducationActions from '../modules/education-actions';

function useColumns(): ColumnDef<EducationListItem>[] {
  return [
    {
      header: 'Eğitim Adı',
      accessorKey: 'name',
      cell: info => info.getValue(),
      accessorFn: ({ name, educationMaterial }) => {
        return (
          <MediaViewerCell
            mediaFile={{
              fileName: name,
              filePath: educationMaterial.contentFile.filePath,
              mediaType: educationMaterial.contentType,
            }}
            title={name}
          />
        );
      },
    },
    {
      header: 'İçerik Adı',
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
