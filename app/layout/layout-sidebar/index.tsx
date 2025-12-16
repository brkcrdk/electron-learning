import Sidebar from '@app/components/ui/sidebar';

import Header from './header';
import SidebarItems from './sidebar-items';

function LayoutSidebar() {
  return (
    <Sidebar
      variant="inset"
      className="mt-12"
    >
      <Header />
      <SidebarItems />
    </Sidebar>
  );
}

export default LayoutSidebar;
