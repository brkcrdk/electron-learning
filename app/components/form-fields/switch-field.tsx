import type { ComponentProps } from 'react';

import cn from '@app/utils/cn';

import Field from '../ui/field';
import Switch from '../ui/switch';

interface Props extends ComponentProps<typeof Switch> {
  error?: string;
  label: string;
}

function SwitchField({ error, ...props }: Props) {
  return (
    <Field className="w-auto">
      <Field.Label htmlFor={props.id}>{props.label}</Field.Label>
      <Switch
        {...props}
        className={cn(props.className, error && 'ring-destructive ring-2')}
      />
      {error && <Field.Error>{error}</Field.Error>}
    </Field>
  );
}

export default SwitchField;
