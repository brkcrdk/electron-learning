import type { ColumnDef } from '@tanstack/react-table';

import MediaViewerCell from '@app/components/table-cells/media-viewer-cell';
import RelativeDateCell from '@app/components/table-cells/relative-date-cell';
import UserCell from '@app/components/table-cells/user-cell';
import Button from '@app/components/ui/button';
import Icon from '@app/components/ui/icon';
import type { IconListProps } from '@app/components/ui/icon/icon-list';
import type { EducationMaterialsListItem, MediaFileTypes } from '@db/schema';

import ContentActions from '../modules/content-actions';

interface ContentTypeOption {
  label: string;
  icon: IconListProps;
}

const contentTypeLabels: Record<MediaFileTypes, ContentTypeOption> = {
  images: {
    label: 'Resim İçeriği',
    icon: 'file-image',
  },
  video: {
    label: 'Video İçeriği',
    icon: 'file-video',
  },
  stories: {
    label: 'Articulate İçeriği',
    icon: 'file-easel',
  },
  pdfs: {
    label: 'PDF İçeriği',
    icon: 'file-pdf',
  },
};

function useColumns(): ColumnDef<EducationMaterialsListItem>[] {
  return [
    {
      header: 'İçerik Başlığı',
      accessorKey: 'contentType',
      cell: info => info.getValue(),
      accessorFn: ({ contentType, name, contentFile }) => {
        return (
          <MediaViewerCell
            mediaFile={contentFile}
            triggerProps={{
              asChild: true,
              children: (
                <Button variant="outline">
                  <Icon name={contentTypeLabels[contentType].icon} />
                  <span className="text-sm">{name}</span>
                </Button>
              ),
            }}
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
