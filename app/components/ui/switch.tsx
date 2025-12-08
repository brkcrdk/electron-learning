import type { HTMLAttributes, InputHTMLAttributes } from 'react';

import cn from '@app/utils/cn';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  rootProps?: HTMLAttributes<HTMLDivElement>;
}

function Switch({ error, label, rootProps, ...switchProps }: Props) {
  return (
    <div
      {...rootProps}
      className={cn('flex items-center gap-2', rootProps?.className)}
    >
      <label
        className="label label-text font-medium"
        htmlFor={switchProps.id}
      >
        {label}
      </label>
      <input
        {...switchProps}
        type="checkbox"
        className={cn('toggle toggle-sm', error && 'input-error', switchProps?.className)}
      />
      {error && <span className="label-text-alt text-error mt-1">{error}</span>}
    </div>
  );
}

export default Switch;
