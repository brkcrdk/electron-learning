import type { ComponentProps } from 'react';

import { Slot } from 'radix-ui';

import cn from '@app/utils/cn';

import buttonVariants, { type SizeVariantTypes, type StyleVariantTypes } from './variants';

interface Props extends ComponentProps<'button'> {
  asChild?: boolean;
  variant?: StyleVariantTypes;
  size?: SizeVariantTypes;
}

function Button({ className, variant, size, asChild = false, ...props }: Props) {
  const Comp = asChild ? Slot.Root : 'button';

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export default Button;
