import { Switch as SwitchPrimitive } from 'radix-ui';

import cn from '@app/utils/cn';

function Switch({ className, ...props }: SwitchPrimitive.SwitchProps) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        'focus-visible:border-ring focus-visible:ring-ring/50 shadow-xs h-4.5 peer inline-flex w-8 max-w-8 shrink-0 items-center rounded-full border border-transparent outline-none transition-all focus-visible:ring-[3px]',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'data-[state=unchecked]:bg-input dark:data-[state=unchecked]:bg-input/80',
        'data-[state=checked]:bg-primary',
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          'bg-background dark:data-[state=unchecked]:bg-foreground dark:data-[state=checked]:bg-primary-foreground pointer-events-none block size-4 rounded-full ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0'
        )}
      />
    </SwitchPrimitive.Root>
  );
}

export default Switch;
