import type { ComponentProps } from 'react';

import cn from '@app/utils/cn';

import SidebarContent from './sidebar-content';
import { SidebarProvider, useSidebar } from './sidebar-context';
import SidebarFooter from './sidebar-footer';
import SidebarGroup from './sidebar-group';
import SidebarGroupAction from './sidebar-group-action';
import SidebarGroupContent from './sidebar-group-content';
import SidebarGroupLabel from './sidebar-group-label';
import SidebarHeader from './sidebar-header';
import SidebarInput from './sidebar-input';
import SidebarInset from './sidebar-inset';
import SidebarMenu from './sidebar-menu';
import SidebarMenuAction from './sidebar-menu-action';
import SidebarMenuBadge from './sidebar-menu-badge';
import SidebarMenuButton from './sidebar-menu-button';
import SidebarMenuItem from './sidebar-menu-item';
import SidebarMenuSkeleton from './sidebar-menu-skeleton';
import SidebarMenuSub from './sidebar-menu-sub';
import SidebarMenuSubButton from './sidebar-menu-sub-button';
import SidebarMenuSubItem from './sidebar-menu-sub-item';
import SidebarRail from './sidebar-rail';
import SidebarSeparator from './sidebar-separator';
import SidebarTrigger from './sidebar-trigger';

interface Props extends ComponentProps<'div'> {
  side?: 'left' | 'right';
  variant?: 'sidebar' | 'floating' | 'inset';
  collapsible?: 'offcanvas' | 'icon' | 'none';
}

function Sidebar({ side = 'left', variant = 'sidebar', collapsible = 'offcanvas', className, children, ...props }: Props) {
  const { state } = useSidebar();

  if (collapsible === 'none') {
    return (
      <div
        data-slot="sidebar"
        className={cn('bg-sidebar text-sidebar-foreground w-(--sidebar-width) flex h-full flex-col', className)}
        {...props}
      >
        {children}
      </div>
    );
  }

  return (
    <div
      className="text-sidebar-foreground group peer"
      data-state={state}
      data-collapsible={state === 'collapsed' ? collapsible : ''}
      data-variant={variant}
      data-side={side}
      data-slot="sidebar"
    >
      {/* This is what handles the sidebar gap on desktop */}
      <div
        data-slot="sidebar-gap"
        className={cn(
          'w-(--sidebar-width) relative bg-transparent transition-[width] duration-200 ease-linear',
          'group-data-[collapsible=offcanvas]:w-0',
          'group-data-[side=right]:rotate-180',
          variant === 'floating' || variant === 'inset'
            ? 'group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]'
            : 'group-data-[collapsible=icon]:w-(--sidebar-width-icon)'
        )}
      />
      <div
        data-slot="sidebar-container"
        className={cn(
          'w-(--sidebar-width) fixed inset-y-0 z-10 flex h-svh transition-[left,right,width] duration-200 ease-linear',
          side === 'left'
            ? 'left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]'
            : 'right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]',
          // Adjust the padding for floating and inset variants.
          variant === 'floating' || variant === 'inset'
            ? 'p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]'
            : 'group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r group-data-[side=right]:border-l',
          className
        )}
        {...props}
      >
        <div
          data-sidebar="sidebar"
          data-slot="sidebar-inner"
          className={cn(
            'bg-sidebar flex size-full flex-col',
            'group-data-[variant=floating]:border-sidebar-border group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:shadow-sm',
            'pt-(--title-bar-height)'
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

Sidebar.Content = SidebarContent;
Sidebar.Footer = SidebarFooter;
Sidebar.Group = SidebarGroup;
Sidebar.GroupAction = SidebarGroupAction;
Sidebar.GroupContent = SidebarGroupContent;
Sidebar.GroupLabel = SidebarGroupLabel;
Sidebar.Header = SidebarHeader;
Sidebar.Input = SidebarInput;
Sidebar.Inset = SidebarInset;
Sidebar.Menu = SidebarMenu;
Sidebar.MenuAction = SidebarMenuAction;
Sidebar.MenuBadge = SidebarMenuBadge;
Sidebar.MenuButton = SidebarMenuButton;
Sidebar.MenuItem = SidebarMenuItem;
Sidebar.MenuSkeleton = SidebarMenuSkeleton;
Sidebar.MenuSub = SidebarMenuSub;
Sidebar.MenuSubButton = SidebarMenuSubButton;
Sidebar.MenuSubItem = SidebarMenuSubItem;
Sidebar.Rail = SidebarRail;
Sidebar.Separator = SidebarSeparator;
Sidebar.Trigger = SidebarTrigger;
Sidebar.Provider = SidebarProvider;
Sidebar.useSidebar = useSidebar;

export default Sidebar;
