import { useMutation } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { useForm, Controller, useWatch } from 'react-hook-form';
import { toast } from 'sonner';

import Input from '../../../components/ui/input';
import PasswordInput from '../../../components/ui/password-input';

interface NewUserForm {
  email: string;
  password: string;
  confirmPassword: string;
}

function SignupForm() {
  const navigate = useNavigate();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: NewUserForm) => {
      console.log(data);
      await window.electronAPI.createSuperAdmin({
        email: data.email,
        password: data.password,
        name: 'Super Admin',
      });
    },
    onSuccess: () => {
      navigate({ to: '/route-c' });
    },
    onError: () => {
      toast.error('Kullanıcı oluşturulurken bir hata gerçekleşti');
    },
  });

  const { handleSubmit, control } = useForm<NewUserForm>({
    defaultValues: {
      email: 'test@test.com',
      password: '12345678',
      confirmPassword: '12345678',
    },
    mode: 'onSubmit',
  });

  const passwordValue = useWatch({
    control,
    name: 'password',
  });

  async function onSubmit(data: NewUserForm) {
    await mutateAsync(data);
  }

  return (
    <form
      className="space-y-4"
      name="welcome-form"
      onSubmit={handleSubmit(onSubmit)}
    >
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

      <button
        type="submit"
        className="btn btn-block mt-6"
        disabled={isPending}
      >
        Kayıt Ol ve Giriş Yap
      </button>
    </form>
  );
}

export default SignupForm;
