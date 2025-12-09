import type { ComponentProps } from 'react';

import cn from '@app/utils/cn';

import Field from '../ui/field';
import PasswordInput from '../ui/password-input';

interface Props extends ComponentProps<typeof PasswordInput> {
  error?: string;
  label: string;
}

function PasswordField({ error, ...props }: Props) {
  return (
    <Field>
      <Field.Label htmlFor="password">Şifre</Field.Label>
      <PasswordInput
        {...props}
        inputProps={{
          ...props.inputProps,
          className: cn(props.inputProps?.className, error && 'border-destructive'),
        }}
      />
      {error && <Field.Error>{error}</Field.Error>}
    </Field>
  );
}

export default PasswordField;
