import { Controller, useFormContext, useWatch } from 'react-hook-form';

import InputField from '@app/components/form-fields/input-field';
import PasswordField from '@app/components/form-fields/password-field';
import { usernameValidation, passwordValidation } from '@app/utils/form-validations';

import type { AuthLayoutMode } from './auth-layout';

export interface LoginFormInputsProps {
  username: string;
  password: string;
}

export interface SignupFormInputsProps {
  username: string;
  password: string;
  confirmPassword: string;
  name: string;
}

interface Props {
  mode: AuthLayoutMode;
}

function FormInputs({ mode }: Props) {
  const { control } = useFormContext<LoginFormInputsProps | SignupFormInputsProps>();

  const passwordValue = useWatch({
    control,
    name: 'password',
    disabled: mode === 'login',
  });

  return (
    <>
      {mode === 'signup' && (
        <Controller
          control={control}
          name="name"
          rules={{ required: 'Lütfen adınız ve soyadınızı giriniz' }}
          render={({ field, fieldState }) => (
            <InputField
              error={fieldState.error?.message}
              label="Adınız"
              id="name"
              placeholder="Adınız ve soyadınız"
              {...field}
            />
          )}
        />
      )}
      <Controller
        control={control}
        name="username"
        rules={usernameValidation}
        render={({ field, fieldState }) => (
          <InputField
            error={fieldState.error?.message}
            label="Kullanıcı Adı"
            id="username"
            placeholder="kullanici_adi"
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
            error={fieldState.error?.message}
            label="Şifre"
            inputProps={{
              id: 'password',
              placeholder: '********',
              ...field,
            }}
          />
        )}
      />
      {mode === 'signup' && (
        <Controller
          control={control}
          name="confirmPassword"
          rules={{
            ...passwordValidation,
            validate: value => {
              if (value !== passwordValue) {
                return 'Şifreler eşleşmiyor!';
              }
              return true;
            },
          }}
          render={({ field, fieldState }) => (
            <PasswordField
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
