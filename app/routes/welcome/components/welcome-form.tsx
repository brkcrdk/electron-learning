import { useForm, Controller, useWatch } from 'react-hook-form';

import PasswordInput from '../../../components/ui/password-input';
import cn from '../../../utils/cn';

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
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="space-y-2">
        <label
          className="label"
          htmlFor="email"
        >
          <span className="label-text font-medium">E-posta</span>
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
            <>
              <input
                className={cn('input input-bordered w-full', fieldState.error ? 'input-error' : '')}
                placeholder="example@example.com"
                id="email"
                {...field}
              />
              {fieldState.error && <span className="label-text-alt text-error mt-1">{fieldState.error.message}</span>}
            </>
          )}
        />
      </div>

      <div className="space-y-2">
        <label
          className="label"
          htmlFor="password"
        >
          <span className="label-text font-medium">Şifre</span>
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
          className="label"
          htmlFor="confirmPassword"
        >
          <span className="label-text font-medium">Şifre (Tekrar)</span>
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
            <>
              <PasswordInput
                inputProps={{
                  placeholder: '********',
                  id: 'confirmPassword',
                  className: fieldState.error ? 'input-error' : '',
                  ...field,
                }}
              />
              {fieldState.error && <span className="label-text-alt text-error mt-1">{fieldState.error.message}</span>}
            </>
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
