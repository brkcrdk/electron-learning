import { unstable_PasswordToggleField as PasswordToggleField } from 'radix-ui';

import Icon from './icon';

const PasswordToggleFieldDemo = () => (
  <PasswordToggleField.Root>
    <div className="bg-black-a2 flex h-[36px] flex-nowrap items-center justify-center gap-2 rounded-[4px] px-[0.75em] pr-[9px] text-white shadow-[0_0_0_1px_var(--black-a6)] focus-within:shadow-[0_0_0_2px_black] hover:shadow-[0_0_0_1px_black]">
      <PasswordToggleField.Input className="all-[unset] selection:bg-blackA6 box-border h-[18px] text-[15px] leading-[1] text-inherit selection:text-white" />
      <PasswordToggleField.Toggle className="all-[unset] focus-visible:outline-accent-9 box-border flex aspect-[1/1] h-[18px] items-center justify-center rounded-[0.5px] text-[15px] leading-[1] text-inherit focus-visible:outline-[2px] focus-visible:outline-offset-[2px]">
        <PasswordToggleField.Icon
          visible={<Icon name="eye-open" />}
          hidden={<Icon name="eye-closed" />}
        />
      </PasswordToggleField.Toggle>
    </div>
  </PasswordToggleField.Root>
);

export default PasswordToggleFieldDemo;
