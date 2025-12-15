import type { ComponentProps } from 'react';

import { ToggleGroup } from 'radix-ui';

import cn from '@app/utils/cn';

import { toggleVariants, type ToggleVariantsTypes } from '../toogle';
import { useToggleContext } from './toggle-context';

interface Props extends ComponentProps<typeof ToggleGroup.Item> {
  variant?: ToggleVariantsTypes['variant'];
  size?: ToggleVariantsTypes['size'];
}

function ToggleItem({ className, children, variant, size, ...props }: Props) {
  const context = useToggleContext();

  return (
    <ToggleGroup.Item
      data-slot="toggle-group-item"
      data-variant={context.variant || variant}
      data-size={context.size || size}
      data-spacing={context.spacing}
      className={cn(
        toggleVariants({
          variant: context.variant || variant,
          size: context.size || size,
        }),
        'w-auto min-w-0 shrink-0 px-3 focus:z-10 focus-visible:z-10',
        'data-[spacing=0]:rounded-none data-[spacing=0]:data-[variant=outline]:border-l-0 data-[spacing=0]:shadow-none data-[spacing=0]:first:rounded-l-md data-[spacing=0]:data-[variant=outline]:first:border-l data-[spacing=0]:last:rounded-r-md',
        className
      )}
      {...props}
    >
      {children}
    </ToggleGroup.Item>
  );
}

export default ToggleItem;
