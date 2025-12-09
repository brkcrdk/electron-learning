import { unstable_PasswordToggleField as PasswordToggle } from 'radix-ui';

import cn from '@app/utils/cn';

import Icon from './icon';

interface Props {
  inputProps?: PasswordToggle.PasswordToggleFieldInputProps;
}

function PasswordInput({ inputProps }: Props) {
  return (
    <PasswordToggle.Root>
      <div className="relative">
        <PasswordToggle.Input
          {...inputProps}
          className={cn(
            'placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input shadow-xs h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base outline-none transition-[color,box-shadow]',
            'file:text-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium',
            'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
            'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
            'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
            inputProps?.className
          )}
        />
        <PasswordToggle.Toggle className="absolute right-4 top-1/2 -translate-y-1/2">
          <PasswordToggle.Icon
            visible={
              <Icon
                name="eye-open"
                className="size-4"
              />
            }
            hidden={
              <Icon
                name="eye-closed"
                className="size-4"
              />
            }
          />
        </PasswordToggle.Toggle>
      </div>
    </PasswordToggle.Root>
  );
}

export default PasswordInput;
