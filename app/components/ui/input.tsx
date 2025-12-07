import type { InputHTMLAttributes } from 'react';

import cn from '@app/utils/cn';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

function Input({ error, label, ...inputProps }: Props) {
  return (
    <div className="space-y-2">
      <label
        className="label label-text font-medium"
        htmlFor={inputProps.id}
      >
        {label}
      </label>
      <input
        {...inputProps}
        className={cn('input input-bordered w-full', error && 'input-error', inputProps?.className)}
      />
      {error && <span className="label-text-alt text-error mt-1">{error}</span>}
    </div>
  );
}

export default Input;
