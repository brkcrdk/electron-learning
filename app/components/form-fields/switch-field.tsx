import type { ComponentProps } from 'react';

import cn from '@app/utils/cn';

import Field from '../ui/field';
import Switch from '../ui/switch';

interface Props extends ComponentProps<typeof Switch> {
  error?: string;
  label: string;
  activeLabel?: string;
  passiveLabel?: string;
}

function SwitchField({ error, activeLabel, passiveLabel, label, ...props }: Props) {
  return (
    <Field className="w-auto">
      <Field.Label htmlFor={props.id}>{label}</Field.Label>
      <div className="flex items-center gap-2">
        {passiveLabel && <Field.Label>{passiveLabel}</Field.Label>}
        <Switch
          {...props}
          className={cn(props.className, error && 'ring-destructive ring-2')}
        />
        {activeLabel && <Field.Label>{activeLabel}</Field.Label>}
      </div>
      {error && <Field.Error>{error}</Field.Error>}
    </Field>
  );
}

export default SwitchField;
