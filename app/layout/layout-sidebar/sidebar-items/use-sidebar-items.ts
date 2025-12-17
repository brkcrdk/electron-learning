import { useQuery } from '@tanstack/react-query';
import { useLocation, type LinkProps } from '@tanstack/react-router';

import type { IconListProps } from '@app/components/ui/icon/icon-list';
import currentUserQuery from '@app/services/current-user-query';

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

  const { data: currentUser } = useQuery(currentUserQuery);

  const sidebarItems: SidebarItem[] = [
    {
      label: 'Eğitimlerim',
      itemKey: 'my-educations',
      icon: 'school-outline',
      isActive: pathname.startsWith('/my-educations'),
      isProtected: false,
      routeProps: {
        to: '/my-educations',
      },
    },
    {
      label: 'Eğitim Listesi',
      itemKey: 'education-list',
      icon: 'book',
      isActive: pathname.startsWith('/education-list'),
      isProtected: currentUser?.role === 'user',
      routeProps: {
        to: '/education-list',
      },
    },
    {
      label: 'Kullanıcılar',
      itemKey: 'user-list',
      icon: 'users',
      isActive: pathname.startsWith('/users'),
      isProtected: currentUser?.role === 'user',
      routeProps: {
        to: '/users',
      },
    },
    {
      label: 'Kategoriler',
      itemKey: 'category-list',
      icon: 'folder',
      isActive: pathname.startsWith('/categories'),
      isProtected: currentUser?.role === 'user',
      routeProps: {
        to: '/categories',
      },
    },
    {
      label: 'Eğitim Materyalleri',
      itemKey: 'education-materials',
      icon: 'easel',
      isActive: pathname.startsWith('/education-materials'),
      isProtected: currentUser?.role === 'user',
      routeProps: {
        to: '/education-materials',
      },
    },
    {
      label: 'Eğitim Atamaları',
      itemKey: 'education-assigments',
      icon: 'person-check',
      isActive: pathname.startsWith('/education-assigments'),
      isProtected: currentUser?.role === 'user',
      routeProps: {
        to: '/education-assigments',
      },
    },
  ];

  return sidebarItems.filter(item => !item.isProtected);
}

export default useSidebarItems;
