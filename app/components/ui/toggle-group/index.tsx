import type { ComponentProps } from 'react';

import { ToggleGroup as ToggleGroupPrimitive } from 'radix-ui';

import cn from '@app/utils/cn';

import { type ToggleVariantsTypes } from '../toogle';
import { ToggleContextProvider } from './toggle-context';
import ToggleItem from './toggle-item';

type Props = ComponentProps<typeof ToggleGroupPrimitive.Root> & {
  variant?: ToggleVariantsTypes['variant'];
  size?: ToggleVariantsTypes['size'];
  spacing?: number;
};

function ToggleGroup({ className, variant, size, spacing = 0, children, ...props }: Props) {
  return (
    <ToggleGroupPrimitive.Root
      data-slot="toggle-group"
      data-variant={variant}
      data-size={size}
      data-spacing={spacing}
      style={{ '--gap': spacing } as React.CSSProperties}
      className={cn(
        'group/toggle-group data-[spacing=default]:data-[variant=outline]:shadow-xs flex w-fit items-center gap-[--spacing(var(--gap))] rounded-md',
        className
      )}
      {...props}
    >
      <ToggleContextProvider
        size={size}
        variant={variant}
        spacing={spacing}
      >
        {children}
      </ToggleContextProvider>
    </ToggleGroupPrimitive.Root>
  );
}

ToggleGroup.Item = ToggleItem;
export default ToggleGroup;
