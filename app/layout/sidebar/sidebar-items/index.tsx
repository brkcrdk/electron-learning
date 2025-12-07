import { Link } from '@tanstack/react-router';

import useSidebarItems from './use-sidebar-items';
import Icon from '../../../components/ui/icon';
import cn from '../../../utils/cn';

function SidebarItems() {
  const sidebarItems = useSidebarItems();

  return (
    <ul className="menu w-full grow gap-1">
      {sidebarItems.map(item => {
        return (
          <li key={item.itemKey}>
            <Link
              data-tip={item.label}
              className={cn('is-drawer-close:tooltip is-drawer-close:tooltip-right', item.isActive && 'bg-primary text-primary-content')}
              {...item.routeProps}
            >
              <Icon
                name={item.icon}
                className="size-5"
              />
              <span className="is-drawer-close:hidden">{item.label}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export default SidebarItems;
