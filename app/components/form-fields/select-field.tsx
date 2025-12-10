import type { ComponentProps } from 'react';

import cn from '@app/utils/cn';

import Field from '../ui/field';
import Select from '../ui/select';

interface Props extends ComponentProps<typeof Select> {
  error?: string;
  label: string;
}

function SelectField({ error, ...props }: Props) {
  return (
    <Field>
      <Field.Label htmlFor={props.id}>{props.label}</Field.Label>
      <Select
        {...props}
        errorMessage={error}
        className={cn(props.className, error && 'border-destructive')}
      />
      {error && <Field.Error>{error}</Field.Error>}
    </Field>
  );
}

export default SelectField;
