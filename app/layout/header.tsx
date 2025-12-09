// import Icon from '@app/components/ui/icon';

import Sidebar from '@app/components/ui/sidebar';

function Header() {
  return (
    // <nav className="navbar bg-base-300 w-full">
    //   <label
    //     htmlFor="sidebar-drawer"
    //     aria-label="open sidebar"
    //     className="btn btn-square btn-ghost"
    //   >
    //     <Icon name="sidebar-expand" />
    //   </label>
    //   <div className="px-4">Navbar Title</div>
    // </nav>
    // <SidebarHeader>
    //   <SidebarMenu>
    //     <SidebarMenuItem>
    //       <SidebarMenuButton
    //         size="lg"
    //         asChild
    //       >
    //         <a href="#">
    //           <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
    //             <Command className="size-4" />
    //           </div>
    //           <div className="grid flex-1 text-left text-sm leading-tight">
    //             <span className="truncate font-medium">Acme Inc</span>
    //             <span className="truncate text-xs">Enterprise</span>
    //           </div>
    //         </a>
    //       </SidebarMenuButton>
    //     </SidebarMenuItem>
    //   </SidebarMenu>
    // </SidebarHeader>
    <Sidebar.Header>
      <Sidebar.Menu>
        <Sidebar.MenuItem>
          <Sidebar.MenuButton
            size="lg"
            // asChild
          >
            asdad
          </Sidebar.MenuButton>
        </Sidebar.MenuItem>
      </Sidebar.Menu>
    </Sidebar.Header>
  );
}

export default Header;
