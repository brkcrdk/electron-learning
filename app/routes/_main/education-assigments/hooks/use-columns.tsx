import type { ColumnDef } from '@tanstack/react-table';

import type { EducationAssignmentListItem } from '@db/schema';

function useColumns(): ColumnDef<EducationAssignmentListItem>[] {
  return [
    {
      header: 'Eğitim Adı',
      accessorKey: 'name',
    },
  ];
}

export default useColumns;
