import type { ColumnDef } from '@tanstack/react-table';

import MediaViewerCell from '@app/components/table-cells/media-viewer-cell';
import RelativeDateCell from '@app/components/table-cells/relative-date-cell';
import UserCell from '@app/components/table-cells/user-cell';
import type { EducationMaterialsListItem } from '@db/schema';

import ContentActions from '../modules/content-actions';

function useColumns(): ColumnDef<EducationMaterialsListItem>[] {
  return [
    {
      header: 'İçerik Başlığı',
      accessorKey: 'contentType',
      cell: info => info.getValue(),
      accessorFn: ({ name, contentFile }) => {
        return (
          <MediaViewerCell
            mediaFile={contentFile}
            title={name}
          />
        );
      },
    },
    {
      header: 'Açıklama',
      accessorKey: 'description',
    },
    {
      header: 'Oluşturan',
      accessorKey: 'createdBy',
      cell: info => info.getValue(),
      accessorFn: ({ createdBy }) => {
        return <UserCell user={createdBy} />;
      },
      size: 50,
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
      size: 50,
      meta: {
        centeredColumn: true,
      },
    },
    {
      header: 'İşlemler',
      accessorKey: 'actions',
      cell: info => info.getValue(),
      accessorFn: content => {
        return <ContentActions content={content} />;
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
