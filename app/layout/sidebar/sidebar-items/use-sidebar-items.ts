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
      label: 'Ayarlar',
      itemKey: 'settings',
      icon: 'settings',
      isActive: pathname.startsWith('/route-c'),
      isProtected: false,
      routeProps: {
        to: '/route-c',
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
  ];

  return sidebarItems;
}

export default useSidebarItems;
