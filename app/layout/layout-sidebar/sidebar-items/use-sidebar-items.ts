import { useLocation, type LinkProps } from '@tanstack/react-router';

import type { IconListProps } from '@app/components/ui/icon/icon-list';

export interface SidebarItem {
  label: string;
  icon: IconListProps;
  itemKey: string;
  isActive: boolean;
  isProtected: boolean;
  routeProps: LinkProps;
}

function useSidebarItems() {
  const { pathname } = useLocation();

  const sidebarItems: SidebarItem[] = [
    {
      label: 'Anasayfa',
      itemKey: 'home',
      icon: 'home',
      isActive: pathname.startsWith('/dashboard'),
      isProtected: false,
      routeProps: {
        to: '/dashboard',
      },
    },
    {
      label: 'Kullanıcılar',
      itemKey: 'user-list',
      icon: 'users',
      isActive: pathname.startsWith('/users'),
      isProtected: false,
      routeProps: {
        to: '/users',
      },
    },
    {
      label: 'Kategoriler',
      itemKey: 'category-list',
      icon: 'folder',
      isActive: pathname.startsWith('/categories'),
      isProtected: false,
      routeProps: {
        to: '/categories',
      },
    },
  ];

  return sidebarItems;
}

export default useSidebarItems;
