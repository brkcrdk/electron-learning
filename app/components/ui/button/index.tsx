import type { ComponentProps } from 'react';

import { Slot } from 'radix-ui';

import cn from '@app/utils/cn';

import buttonVariants, { type SizeVariantTypes, type StyleVariantTypes } from './variants';
import Spinner from '../spinner';

interface Props extends ComponentProps<'button'> {
  asChild?: boolean;
  variant?: StyleVariantTypes;
  size?: SizeVariantTypes;
  isLoading?: boolean;
}

function Button({ className, variant, size, asChild = false, isLoading = false, ...props }: Props) {
  const Comp = asChild ? Slot.Root : 'button';

  return (
    <Comp
      data-slot="button"
      {...props}
      className={cn(buttonVariants({ variant, size, className }))}
    >
      {isLoading && <Spinner />}
      {props.children}
    </Comp>
  );
}

export default Button;
export { buttonVariants };
