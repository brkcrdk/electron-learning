import type { ColumnDef } from '@tanstack/react-table';

import type { User } from '@db/schema';

function useColumns(): ColumnDef<User>[] {
  return [
    {
      header: 'Adı',
      accessorKey: 'name',
    },
    {
      header: 'Kullanıcı Adı',
      accessorKey: 'username',
    },
  ];
}

export default useColumns;
