import { unstable_PasswordToggleField as PasswordToggleField } from 'radix-ui';

import Icon from './icon';

interface Props {
  inputProps?: PasswordToggleField.PasswordToggleFieldInputProps;
}

function PasswordInput({ inputProps }: Props) {
  return (
    <PasswordToggleField.Root>
      <div className="relative flex items-center gap-2">
        <PasswordToggleField.Input
          {...inputProps}
          className="input"
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
    </PasswordToggleField.Root>
  );
}

export default PasswordInput;
