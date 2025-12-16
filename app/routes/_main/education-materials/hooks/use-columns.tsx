import type { ColumnDef } from '@tanstack/react-table';

import RelativeDateCell from '@app/components/table-cells/relative-date-cell';
import UserCell from '@app/components/table-cells/user-cell';
import Icon from '@app/components/ui/icon';
import type { IconListProps } from '@app/components/ui/icon/icon-list';
// import ImageFallback from '@app/components/ui/image-fallback';
// import getContentPath from '@app/utils/get-content-path';
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
      header: 'İçerik Tipi',
      accessorKey: 'contentType',
      cell: info => info.getValue(),
      accessorFn: ({ contentType }) => {
        return (
          <div className="flex items-center gap-1">
            <Icon name={contentTypeLabels[contentType].icon} />
            <span className="text-sm">{contentTypeLabels[contentType].label}</span>
          </div>
        );
      },
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
