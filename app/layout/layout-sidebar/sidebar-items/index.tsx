import { Link } from '@tanstack/react-router';

import Icon from '@app/components/ui/icon';
import Sidebar from '@app/components/ui/sidebar';

import useSidebarItems from './use-sidebar-items';

function SidebarItems() {
  const sidebarItems = useSidebarItems();
  return (
    <Sidebar.Content>
      <Sidebar.Menu>
        {sidebarItems.map(item => (
          <Sidebar.MenuItem key={item.itemKey}>
            <Sidebar.MenuButton
              asChild
              isActive={item.isActive}
            >
              <Link to={item.routeProps.to}>
                <Icon
                  name={item.icon}
                  className="size-4"
                />
                {item.label}
              </Link>
            </Sidebar.MenuButton>
          </Sidebar.MenuItem>
        ))}
      </Sidebar.Menu>
    </Sidebar.Content>
  );
}

export default SidebarItems;
