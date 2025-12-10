import type { ComponentProps } from 'react';

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
      />
      {error && <Field.Error>{error}</Field.Error>}
    </Field>
  );
}

export default SelectField;
