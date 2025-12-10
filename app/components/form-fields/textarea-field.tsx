import type { ComponentProps } from 'react';

import Field from '../ui/field';
import Textarea from '../ui/textarea';

interface Props extends ComponentProps<typeof Textarea> {
  error?: string;
  label: string;
}

function TextareaField({ error, label, ...props }: Props) {
  return (
    <Field>
      <Field.Label htmlFor={props.id}>{label}</Field.Label>
      <Textarea {...props} />
      {error && <Field.Error>{error}</Field.Error>}
    </Field>
  );
}

export default TextareaField;
