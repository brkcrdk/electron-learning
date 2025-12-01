import { Link } from '@tanstack/react-router';

import Icon from '../components/ui/icon';

import type { IconListProps } from '../components/ui/icon/icon-list';

interface SidebarItem {
  label: string;
  icon: IconListProps;
  route: string;
  itemKey: string;
  /**
   * Aktif routea göre itemı aktif stateinde render ediyoruz.
   */
  isActive: boolean;
  /**
   * Mevcut routeu belirli rollere kapatmak istediğimizde bu kullanımı yapıyoruz.
   * Daha sonrasında da arrayi bu değere göre filtreleyerek render ediyoruz.
   */
  isProtected: boolean;
}

const sidebarItems: SidebarItem[] = [
  {
    label: 'Anasayfa',
    itemKey: 'home',
    icon: 'home',
    route: '/',
    isActive: false,
    isProtected: false,
  },
  {
    label: 'Ayarlar',
    itemKey: 'settings',
    icon: 'settings',
    route: '/settings',
    isActive: false,
    isProtected: false,
  },
];

function Sidebar() {
  return (
    <div className="drawer-side is-drawer-close:overflow-visible">
      <label
        htmlFor="my-drawer-4"
        aria-label="close sidebar"
        className="drawer-overlay"
      />
      <div className="bg-base-200 border-base-100 is-drawer-close:w-14 is-drawer-open:w-64 flex min-h-full flex-col items-start">
        <ul className="menu w-full grow">
          {sidebarItems.map(item => (
            <li key={item.itemKey}>
              <Link
                to={item.route}
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip={item.label}
              >
                <Icon
                  name={item.icon}
                  className="size-5"
                />
                <span className="is-drawer-close:hidden">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
