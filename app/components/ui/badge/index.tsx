import { Slot } from 'radix-ui';

import cn from '@app/utils/cn';

import badgeVariants, { type BadgeVariantTypes } from './badge-variants';

interface Props extends React.ComponentProps<'span'> {
  variant?: BadgeVariantTypes;
  asChild?: boolean;
}

function Badge({ className, variant, asChild = false, ...props }: Props) {
  const Comp = asChild ? Slot.Root : 'span';

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export default Badge;
export { type BadgeVariantTypes, badgeVariants };
