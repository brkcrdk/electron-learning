import { Controller, useFormContext, useWatch } from 'react-hook-form';

import Input from '../../../components/ui/input';
import PasswordInput from '../../../components/ui/password-input';
import { emailValidation } from '../../../utils/form-validations';

import type { AuthLayoutMode } from './auth-layout';
import type { LoginFormProps } from './login-form';
import type { NewUserFormProps } from './signup-form';

interface Props {
  mode: AuthLayoutMode;
}

function FormInputs({ mode }: Props) {
  const { control } = useFormContext<NewUserFormProps | LoginFormProps>();

  const passwordValue = useWatch({
    control,
    name: 'password',
    disabled: mode === 'login',
  });

  return (
    <>
      <Controller
        control={control}
        name="email"
        rules={emailValidation}
        render={({ field, fieldState }) => (
          <Input
            error={fieldState.error?.message}
            label="E-posta"
            id="email"
            placeholder="example@example.com"
            {...field}
          />
        )}
      />

      <Controller
        control={control}
        name="password"
        rules={{
          required: 'Şifre alanı zorunludur',
          minLength: {
            value: 8,
            message: 'Şifre en az 8 karakter olmalıdır',
          },
        }}
        render={({ field, fieldState }) => (
          <PasswordInput
            error={fieldState.error?.message}
            label="Şifre"
            inputProps={{
              placeholder: '********',
              id: 'password',
              value: field.value,
              onChange: field.onChange,
            }}
          />
        )}
      />

      {mode === 'signup' && (
        <Controller
          control={control}
          name="confirmPassword"
          rules={{
            required: 'Şifre tekrar alanı zorunludur',
            validate: value => {
              if (value !== passwordValue) {
                return 'Şifreler eşleşmiyor!';
              }
              return true;
            },
            minLength: {
              value: 8,
              message: 'Şifre en az 8 karakter olmalıdır',
            },
          }}
          render={({ field, fieldState }) => (
            <PasswordInput
              label="Şifre (Tekrar)"
              error={fieldState.error?.message}
              inputProps={{
                placeholder: '********',
                id: 'confirmPassword',
                ...field,
              }}
            />
          )}
        />
      )}
    </>
  );
}

export default FormInputs;
