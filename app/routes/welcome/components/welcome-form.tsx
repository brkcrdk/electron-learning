import { useForm, Controller, useWatch } from 'react-hook-form';

import Input from '../../../components/ui/input';
import PasswordInput from '../../../components/ui/password-input';

interface NewUserForm {
  email: string;
  password: string;
  confirmPassword: string;
}

function WelcomeForm() {
  const { register, handleSubmit, control } = useForm<NewUserForm>({
    mode: 'onSubmit',
  });
  const passwordValue = useWatch({
    control,
    name: 'password',
  });

  function onSubmit(data: NewUserForm) {
    console.log(data);
  }

  return (
    <form
      className="space-y-4"
      name="welcome-form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="space-y-2">
        <label
          className="label label-text font-medium"
          htmlFor="email"
        >
          E-posta
        </label>
        <Controller
          control={control}
          name="email"
          rules={{
            required: 'E-posta alanı zorunludur',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Geçerli bir e-posta adresi giriniz',
            },
          }}
          render={({ field, fieldState }) => (
            <Input
              error={fieldState.error?.message}
              id="email"
              placeholder="example@example.com"
              {...field}
            />
          )}
        />
      </div>

      <div className="space-y-2">
        <label
          className="label label-text font-medium"
          htmlFor="password"
        >
          Şifre
        </label>
        <PasswordInput
          inputProps={{
            placeholder: '********',
            id: 'password',
            ...register('password'),
          }}
        />
      </div>

      <div className="space-y-2">
        <label
          className="label label-text font-medium"
          htmlFor="confirmPassword"
        >
          Şifre (Tekrar)
        </label>
        <Controller
          control={control}
          name="confirmPassword"
          rules={{
            minLength: {
              value: 8,
              message: 'Şifre en az 8 karakter olmalıdır',
            },
            validate: value => {
              if (value !== passwordValue) {
                return 'Şifreler eşleşmiyor!';
              }
              return true;
            },
          }}
          render={({ field, fieldState }) => (
            <PasswordInput
              error={fieldState.error?.message}
              inputProps={{
                placeholder: '********',
                id: 'confirmPassword',
                ...field,
              }}
            />
          )}
        />
      </div>

      <button
        type="submit"
        className="btn btn-block mt-6"
      >
        Kayıt Ol ve Giriş Yap
      </button>
    </form>
  );
}

export default WelcomeForm;
