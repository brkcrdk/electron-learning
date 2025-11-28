import { unstable_PasswordToggleField as PasswordToggleField } from 'radix-ui';

import Icon from './icon';
import cn from '../../utils/cn';

interface Props {
  inputProps?: PasswordToggleField.PasswordToggleFieldInputProps;
  error?: string;
}

function PasswordInput({ inputProps, error }: Props) {
  return (
    <PasswordToggleField.Root>
      <div className="relative flex items-center gap-2">
        <PasswordToggleField.Input
          {...inputProps}
          className={cn('input w-full', error && 'input-error', inputProps?.className)}
        />
        <PasswordToggleField.Toggle className="btn btn-ghost btn-xs absolute right-2 z-10">
          <PasswordToggleField.Icon
            visible={
              <Icon
                name="eye-open"
                className="size-4"
              />
            }
            hidden={
              <Icon
                name="eye-closed"
                className="size-4"
              />
            }
          />
        </PasswordToggleField.Toggle>
      </div>
      {error && <span className="label-text-alt text-error mt-1">{error}</span>}
    </PasswordToggleField.Root>
  );
}

export default PasswordInput;
