import type { ColumnDef } from '@tanstack/react-table';

import RelativeDateCell from '@app/components/table-cells/relative-date-cell';
import UserCell from '@app/components/table-cells/user-cell';
import Icon from '@app/components/ui/icon';
import type { IconListProps } from '@app/components/ui/icon/icon-list';
import Tooltip from '@app/components/ui/tooltip';
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
      accessorFn: ({ contentType, name }) => {
        return (
          <div className="flex items-center gap-1">
            <Tooltip>
              <Tooltip.Trigger>
                <Icon name={contentTypeLabels[contentType].icon} />
              </Tooltip.Trigger>
              <Tooltip.Content>
                <p>{contentTypeLabels[contentType].label}</p>
              </Tooltip.Content>
            </Tooltip>
            <span className="text-sm">{name}</span>
          </div>
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
