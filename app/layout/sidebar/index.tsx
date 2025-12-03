import SidebarHeader from './sidebar-header';
import SidebarItems from './sidebar-items';
import SidebarRail from './sidebar-rail';

function Sidebar() {
  return (
    <div className="drawer-side is-drawer-close:overflow-visible">
      <label
        htmlFor="my-drawer-4"
        aria-label="close sidebar"
        className="drawer-overlay"
      />

      <div className="bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64 flex min-h-full flex-col items-start">
        <SidebarHeader />
        <SidebarItems />
      </div>
      <SidebarRail />
    </div>
  );
}

export default Sidebar;
