import type { ComponentPropsWithoutRef } from 'react';

import Input from '@app/components/ui/input';
import cn from '@app/utils/cn';

interface Props {
  inputProps?: ComponentPropsWithoutRef<typeof Input>;
}

function PasswordInput({ inputProps }: Props) {
  return (
    <Input
      {...inputProps}
      // type={isPasswordVisible ? 'text' : 'password'}
      // className={cn('rounded-xl border-none bg-transparent shadow-none focus-visible:border-transparent focus-visible:ring-0', inputProps?.className)}
      // {...props}
    />
  );
}

export default PasswordInput;
