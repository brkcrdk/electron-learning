import type { ColumnDef } from '@tanstack/react-table';

import type { EducationAssignmentListItem } from '@db/schema';

function useColumns(): ColumnDef<EducationAssignmentListItem>[] {
  return [
    {
      header: 'Eğitim Ataması Başlığı',
      accessorKey: 'title',
    },
    {
      header: 'Açıklamasıı',
      accessorKey: 'description',
    },
  ];
}

export default useColumns;
