import type { ComponentProps } from 'react';

import cn from '@app/utils/cn';

import Field from '../ui/field';
import Input from '../ui/input';

interface Props extends ComponentProps<typeof Input> {
  error?: string;
  label: string;
}

function InputField({ error, label, ...props }: Props) {
  return (
    <Field>
      <Field.Label htmlFor={props.id}>{label}</Field.Label>
      <Input
        {...props}
        className={cn(props.className, error && 'ring-destructive ring-2')}
      />
      {error && <Field.Error>{error}</Field.Error>}
    </Field>
  );
}

export default InputField;
