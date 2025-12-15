import type { ComponentProps } from 'react';

import Field from '../ui/field';
import SelectTree from '../ui/select-tree';

interface Props extends ComponentProps<typeof SelectTree> {
  error?: string;
  label: string;
  inputId: string;
}

function SelectTreeField({ error, label, inputId, ...props }: Props) {
  return (
    <Field>
      <Field.Label htmlFor={inputId}>{label}</Field.Label>
      <SelectTree {...props} />
      {error && <Field.Error>{error}</Field.Error>}
    </Field>
  );
}

export default SelectTreeField;
