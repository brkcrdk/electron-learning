import type { ColumnDef } from '@tanstack/react-table';

import RelativeDateCell from '@app/components/table-cells/relative-date-cell';
import UserCell from '@app/components/table-cells/user-cell';
import Badge from '@app/components/ui/badge';
import type { EducationAssignmentListItem } from '@db/schema';

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
        return <Badge>{education.name}</Badge>;
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
      accessorFn: ({ assignees }) => {
        return assignees.length;
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
      accessorFn: ({ id }) => {
        // return <EducationAssignmentActions assignment={id} />;
        return 'işlemler';
      },
    },
  ];
}

export default useColumns;
