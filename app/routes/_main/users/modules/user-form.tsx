import { Controller, useFormContext } from 'react-hook-form';

import InputField from '@app/components/form-fields/input-field';
import PasswordField from '@app/components/form-fields/password-field';
import SwitchField from '@app/components/form-fields/switch-field';
import Field from '@app/components/ui/field';
import Select from '@app/components/ui/select';
import { emailValidation, passwordValidation } from '@app/utils/form-validations';
import type { User } from '@db/schema';

export interface UserFormInputs {
  name: string;
  email: string;
  password: string;
  roles: { label: string; value: User['roles'] };
  isActive: boolean;
}

interface UserRoleOption {
  label: string;
  value: User['roles'];
}

export const userRoleOptions: UserRoleOption[] = [
  { label: 'User', value: 'user' },
  { label: 'Admin', value: 'admin' },
  { label: 'Super Admin', value: 'super-admin' },
];

function UserForm() {
  const { control } = useFormContext<UserFormInputs>();

  return (
    <Field.Group>
      <Controller
        control={control}
        name="name"
        rules={{ required: 'Adı Soyadı alanı zorunludur' }}
        render={({ field, fieldState }) => (
          <InputField
            label="Kullanıcı adı soyadı:"
            placeholder="Adı Soyadı"
            error={fieldState.error?.message}
            {...field}
          />
        )}
      />
      <Controller
        control={control}
        name="email"
        rules={emailValidation}
        render={({ field, fieldState }) => (
          <InputField
            label="Kullanıcı e-posta adresi:"
            placeholder="test@example.com"
            error={fieldState.error?.message}
            {...field}
          />
        )}
      />
      <Controller
        control={control}
        name="password"
        rules={passwordValidation}
        render={({ field, fieldState }) => (
          <PasswordField
            label="Kullanıcı şifresi:"
            error={fieldState.error?.message}
            inputProps={{
              placeholder: '********',
              id: 'password',
              value: field.value,
              onChange: field.onChange,
            }}
          />
        )}
      />
      <Controller
        control={control}
        name="roles"
        rules={{ required: 'Rol alanı zorunludur' }}
        render={({ field, fieldState }) => (
          <Select
            label="Kullanıcı rolü:"
            errorMessage={fieldState.error?.message}
            options={userRoleOptions}
            getOptionLabel={val => val.label}
            getOptionValue={val => val.value}
            {...field}
          />
        )}
      />
      <Controller
        control={control}
        name="isActive"
        render={({ field, fieldState }) => (
          <SwitchField
            label="Kullanıcı aktiflik durumu:"
            activeLabel="Aktif"
            passiveLabel="Pasif"
            error={fieldState.error?.message}
            checked={field.value}
            onCheckedChange={field.onChange}
          />
        )}
      />
    </Field.Group>
  );
}

export default UserForm;
