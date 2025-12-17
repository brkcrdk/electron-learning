import type { ColumnDef } from '@tanstack/react-table';

import MediaViewerCell from '@app/components/table-cells/media-viewer-cell';
import RelativeDateCell from '@app/components/table-cells/relative-date-cell';
import UserCell from '@app/components/table-cells/user-cell';
import Badge from '@app/components/ui/badge';
import type { EducationAssignmentListItem } from '@db/schema';

import AssignmentActions from '../modules/assigment-actions';

function useColumns(): ColumnDef<EducationAssignmentListItem>[] {
  return [
    {
      header: 'Eğitim Ataması Başlığı',
      accessorKey: 'title',
    },
    {
      header: 'Eğitim',
      accessorKey: 'education',
      cell: info => info.getValue(),
      accessorFn: ({ education }) => {
        return (
          <MediaViewerCell
            mediaFile={education.educationMaterial.contentFile}
            title={education.name}
          />
        );
      },
      meta: {
        centeredColumn: true,
      },
    },
    {
      header: 'Atama Yapan',
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
      header: 'Atanan Kullanıcı Sayısı',
      accessorKey: 'updatedAt',
      cell: info => info.getValue(),
      accessorFn: ({ assigneeCount }) => {
        return <Badge>{assigneeCount} Kişi</Badge>;
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
      accessorFn: assignment => {
        return <AssignmentActions assignment={assignment} />;
      },
    },
  ];
}

export default useColumns;
