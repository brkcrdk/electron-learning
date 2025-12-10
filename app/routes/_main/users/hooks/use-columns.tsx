import type { ColumnDef } from '@tanstack/react-table';

import RelativeDateCell from '@app/components/table-cells/relative-date-cell';
import Badge, { type BadgeVariantTypes } from '@app/components/ui/badge';
import type { User } from '@db/schema';

import DeleteUser from '../modules/delete-user';
import EditUser from '../modules/edit-user';

interface ColumnBadgeProps {
  label: string;
  badgeType: BadgeVariantTypes;
}

const userRoles: Record<User['roles'], ColumnBadgeProps> = {
  'super-admin': {
    label: 'Super Admin',
    badgeType: 'default',
  },
  admin: {
    label: 'Admin',
    badgeType: 'secondary',
  },
  user: {
    label: 'User',
    badgeType: 'default',
  },
};

const userStatus: Record<User['status'], ColumnBadgeProps> = {
  active: {
    label: 'Aktif',
    badgeType: 'default',
  },
  passive: {
    label: 'Pasif',
    badgeType: 'destructive',
  },
};

function useColumns(): ColumnDef<User>[] {
  return [
    {
      header: 'Adı',
      accessorKey: 'name',
    },
    {
      header: 'Email',
      accessorKey: 'email',
      meta: {
        centeredColumn: true,
      },
    },
    {
      header: 'Rol',
      accessorKey: 'roles',
      cell: info => info.getValue(),
      accessorFn: ({ roles }) => {
        return <Badge variant={userRoles[roles].badgeType}>{userRoles[roles].label}</Badge>;
      },
      meta: {
        centeredColumn: true,
      },
    },
    {
      header: 'Durum',
      accessorKey: 'status',
      cell: info => info.getValue(),
      accessorFn: ({ status }) => {
        return <Badge variant={userStatus[status].badgeType}>{userStatus[status].label}</Badge>;
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
      header: 'Son Giriş Tarihi',
      accessorKey: 'lastLoginAt',
      cell: info => info.getValue(),
      accessorFn: ({ lastLoginAt }) => {
        if (!lastLoginAt) return <Badge variant="secondary">Giriş Yapmadı.</Badge>;
        return <RelativeDateCell date={lastLoginAt} />;
      },
      meta: {
        centeredColumn: true,
      },
    },
    {
      header: 'İşlemler',
      accessorKey: 'actions',
      cell: info => info.getValue(),
      accessorFn: user => {
        return (
          <div className="flex items-center gap-2">
            <EditUser user={user} />
            <DeleteUser userId={user.id} />
          </div>
        );
      },
      enableSorting: false,
      meta: {
        centeredColumn: true,
      },
    },
  ];
}

export default useColumns;
