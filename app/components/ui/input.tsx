import cn from '../../utils/cn';

import type { InputHTMLAttributes } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

function Input({ error, ...inputProps }: Props) {
  return (
    <div>
      <input
        {...inputProps}
        className={cn('input input-bordered w-full', error && 'input-error', inputProps?.className)}
      />
      {error && <span className="label-text-alt text-error mt-1">{error}</span>}
    </div>
  );
}

export default Input;
