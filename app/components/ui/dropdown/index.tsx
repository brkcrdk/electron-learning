import { Link } from '@tanstack/react-router';
import { DropdownMenu } from 'radix-ui';

import cn from '../../../utils/cn';
import Icon from '../icon';

import type { DropdownItemProps } from './dropdown-item-props';

interface Props {
  triggerProps?: DropdownMenu.DropdownMenuTriggerProps;
  contentProps?: DropdownMenu.DropdownMenuContentProps;
  dropdownItems: DropdownItemProps[];
}

function Dropdown({ triggerProps, contentProps, dropdownItems }: Props) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger
        {...triggerProps}
        className={cn('btn btn-sm', triggerProps?.className)}
      />
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          sideOffset={10}
          collisionPadding={8}
          {...contentProps}
          className={cn(
            'bg-base-100 z-popover-content relative grid min-w-52 gap-0.5 overflow-auto rounded-xl p-2 shadow-lg',
            'max-h-[calc(var(--radix-dropdown-menu-content-available-height)-1rem)]',
            contentProps?.className
          )}
        >
          {dropdownItems.map(item => {
            if (item.itemType === 'separator') {
              return (
                <DropdownMenu.Separator
                  key={item.dropdownItemId}
                  {...item.itemProps}
                  className={cn('divider my-0', item.itemProps?.className)}
                />
              );
            }

            if (item.itemType === 'custom') {
              return (
                <DropdownMenu.DropdownMenuItem
                  key={item.dropdownItemId}
                  {...item.itemProps}
                />
              );
            }
            if (item.itemType === 'label') {
              return (
                <DropdownMenu.DropdownMenuLabel
                  key={item.dropdownItemId}
                  {...item.itemProps}
                  className={cn('p-2', item.itemProps.className)}
                />
              );
            }

            if (item.itemType === 'link') {
              const { icon, children, ...rest } = item.itemProps;
              return (
                <DropdownMenu.DropdownMenuItem
                  asChild
                  key={item.dropdownItemId}
                  disabled={Boolean(item.itemProps['aria-disabled'])}
                >
                  <Link
                    {...rest}
                    className={cn('btn btn-ghost flex items-center justify-start', 'data-highlighted:btn-soft', 'aria-disabled:btn-disabled', rest.className)}
                  >
                    <>
                      {icon && <Icon {...icon} />}
                      {children}
                    </>
                  </Link>
                </DropdownMenu.DropdownMenuItem>
              );
            }

            const { icon, isLoading, ...defaultItemProps } = item.itemProps;

            return (
              <DropdownMenu.DropdownMenuItem
                key={item.dropdownItemId}
                {...defaultItemProps}
                className={cn(
                  'btn btn-ghost flex items-center justify-start',
                  'data-highlighted:btn-soft',
                  'aria-disabled:btn-disabled',
                  defaultItemProps.className
                )}
              >
                {icon && <Icon {...icon} />}
                {isLoading && <span className="loading loading-spinner loading-xs" />}
                <span>{item.itemProps.children}</span>
              </DropdownMenu.DropdownMenuItem>
            );
          })}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

export default Dropdown;

export type { DropdownItemProps };
