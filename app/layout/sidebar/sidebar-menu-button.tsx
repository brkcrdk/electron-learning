import type { ComponentProps } from 'react';

import { Slot } from 'radix-ui';

import Tooltip from '@app/components/ui/tooltip';
import TooltipContent from '@app/components/ui/tooltip/tooltip-content';
import TooltipTrigger from '@app/components/ui/tooltip/tooltip-trigger';
import cn from '@app/utils/cn';

import { useSidebar } from './sidebar-context';
import sidebarMenuButtonVariants, { type SidebarMenuButtonVariants } from './sidebar-menu-button-variants';

type Props = ComponentProps<'button'> &
  SidebarMenuButtonVariants & {
    asChild?: boolean;
    isActive?: boolean;
    tooltip?: string | ComponentProps<typeof TooltipContent>;
  };

function SidebarMenuButton({ asChild = false, isActive = false, variant = 'default', size = 'default', tooltip, className, ...props }: Props) {
  const Comp = asChild ? Slot.Root : 'button';
  const { state } = useSidebar();

  const button = (
    <Comp
      data-slot="sidebar-menu-button"
      data-sidebar="menu-button"
      data-size={size}
      data-active={isActive}
      className={cn(sidebarMenuButtonVariants({ variant, size }), className)}
      {...props}
    />
  );

  if (!tooltip) {
    return button;
  }

  if (typeof tooltip === 'string') {
    tooltip = {
      children: tooltip,
    };
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>{button}</TooltipTrigger>
      <TooltipContent
        side="right"
        align="center"
        hidden={state !== 'collapsed'}
        {...tooltip}
      />
    </Tooltip>
  );
}

export default SidebarMenuButton;
