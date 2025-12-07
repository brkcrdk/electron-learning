import type { ColumnDef } from '@tanstack/react-table';

import RelativeDateCell from '@app/components/table-cells/relative-date-cell';
import type { User } from '@db/schema';

function useColumns(): ColumnDef<User>[] {
  return [
    {
      header: 'Adı',
      accessorKey: 'name',
    },
    {
      header: 'Email',
      accessorKey: 'email',
    },
    {
      header: 'Rol',
      accessorKey: 'roles',
    },
    {
      header: 'Durum',
      accessorKey: 'status',
    },
    {
      header: 'Oluşturulma Tarihi',
      accessorKey: 'createdAt',
      cell: info => info.getValue(),
      accessorFn: ({ createdAt }) => {
        return <RelativeDateCell date={createdAt} />;
      },
    },
    {
      header: 'Son Giriş Tarihi',
      accessorKey: 'lastLoginAt',
      cell: info => info.getValue(),
      accessorFn: ({ lastLoginAt }) => {
        if (!lastLoginAt) return null;
        return <RelativeDateCell date={lastLoginAt} />;
      },
    },
  ];
}

export default useColumns;
