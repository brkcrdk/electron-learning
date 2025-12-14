import type { ColumnDef } from '@tanstack/react-table';

import RelativeDateCell from '@app/components/table-cells/relative-date-cell';
import UserCell from '@app/components/table-cells/user-cell';
import Icon from '@app/components/ui/icon';
import type { IconListProps } from '@app/components/ui/icon/icon-list';
import type { EducationListItem, MediaFileTypes } from '@db/schema';

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

function useColumns(): ColumnDef<EducationListItem>[] {
  return [
    {
      header: 'Adı',
      accessorKey: 'name',
      cell: info => info.getValue(),
      accessorFn: ({ name, coverImage }) => {
        return (
          <div className="flex items-center gap-2">
            <img
              // src={getContentPath(coverImage.filePath)}
              alt={name}
            />
            <span className="line-clamp-1 max-w-40">{name}</span>
          </div>
        );
      },
    },
    {
      header: 'İçerik Tipi',
      accessorKey: 'contentType',
      meta: {
        centeredColumn: true,
      },
      cell: info => info.getValue(),
      accessorFn: ({ contentType }) => {
        return (
          <div className="flex items-center justify-center gap-2">
            <Icon name={contentTypeLabels[contentType].icon} />
            <span>{contentTypeLabels[contentType].label}</span>
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
  ];
}

export default useColumns;
