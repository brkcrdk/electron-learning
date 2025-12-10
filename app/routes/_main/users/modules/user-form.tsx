import { Controller, useFormContext } from 'react-hook-form';

import InputField from '@app/components/form-fields/input-field';
import PasswordField from '@app/components/form-fields/password-field';
import SelectField from '@app/components/form-fields/select-field';
import Field from '@app/components/ui/field';
import { emailValidation, passwordValidation } from '@app/utils/form-validations';
import type { User } from '@db/schema';

export interface UserFormInputs {
  name: string;
  email: string;
  password: string;
  roles: User['roles'];
  isActive: boolean;
}

function UserForm() {
  const { control } = useFormContext<UserFormInputs>();

  return (
    <>
      <Field.Group>
        <Controller
          control={control}
          name="name"
          rules={{ required: 'Adı Soyadı alanı zorunludur' }}
          render={({ field, fieldState }) => (
            <InputField
              label="Adı Soyadı"
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
              label="E-posta"
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
              label="Şifre"
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
        <SelectField
          label="Rol"
          placeholder="Rol seçiniz"
          isMulti
          options={[
            { label: 'Admin', value: 'admin' },
            { label: 'User', value: 'user' },
          ]}
        />
      </Field.Group>
    </>
  );
}

export default UserForm;
