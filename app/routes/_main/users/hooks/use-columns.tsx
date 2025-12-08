import type { ColumnDef } from '@tanstack/react-table';

import RelativeDateCell from '@app/components/table-cells/relative-date-cell';
import cn from '@app/utils/cn';
import type { User } from '@db/schema';

import EditUser from './edit-user';

interface ColumnBadgeProps {
  label: string;
  badgeType: string;
}

const userRoles: Record<User['roles'], ColumnBadgeProps> = {
  'super-admin': {
    label: 'Super Admin',
    badgeType: 'badge-success',
  },
  admin: {
    label: 'Admin',
    badgeType: 'badge-primary',
  },
  user: {
    label: 'User',
    badgeType: 'badge-default',
  },
};

const userStatus: Record<User['status'], ColumnBadgeProps> = {
  active: {
    label: 'Aktif',
    badgeType: 'badge-success',
  },
  passive: {
    label: 'Pasif',
    badgeType: 'badge-default',
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
        return <span className={cn('badge badge-soft', userRoles[roles].badgeType)}>{userRoles[roles].label}</span>;
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
        return <span className={cn('badge badge-soft', userStatus[status].badgeType)}>{userStatus[status].label}</span>;
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
        if (!lastLoginAt) return null;
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
      accessorFn: ({ id }) => {
        return <EditUser />;
      },
      meta: {
        centeredColumn: true,
      },
    },
  ];
}

export default useColumns;
