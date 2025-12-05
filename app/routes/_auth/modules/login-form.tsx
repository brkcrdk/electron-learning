import { useMutation } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { useForm, FormProvider } from 'react-hook-form';
import { toast } from 'sonner';

import FormInputs from './form-inputs';

export interface LoginFormProps {
  email: string;
  password: string;
}

function LoginForm() {
  const navigate = useNavigate();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data: LoginFormProps) => {
      return window.electronAPI.login({
        email: data.email,
        password: data.password,
      });
    },
    onSuccess: () => {
      navigate({ to: '/' });
    },
    onError: () => {
      toast.error('Giriş yapılırken bir hata gerçekleşti', {
        dismissible: false,
      });
    },
  });

  const form = useForm<LoginFormProps>({
    defaultValues: {
      email: 'test@test.com',
      password: '12345678',
    },
    mode: 'onSubmit',
  });

  async function onSubmit(data: LoginFormProps) {
    await mutateAsync(data);
  }

  return (
    <FormProvider {...form}>
      <form
        aria-disabled={isPending}
        className="aria-disabled:disable-interactions space-y-4"
        name="welcome-form"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormInputs mode="login" />
        <button
          type="submit"
          className="btn btn-block mt-6"
        >
          Giriş Yap
        </button>
      </form>
    </FormProvider>
  );
}

export default LoginForm;
