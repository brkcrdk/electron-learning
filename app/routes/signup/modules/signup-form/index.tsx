import { useMutation } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { useForm, FormProvider } from 'react-hook-form';
import { toast } from 'sonner';

import FormInputs from './form-inputs';

export interface NewUserForm {
  email: string;
  password: string;
  confirmPassword: string;
}

function SignupForm() {
  const navigate = useNavigate();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data: NewUserForm) => {
      return window.electronAPI.createSuperAdmin({
        email: data.email,
        password: data.password,
        name: 'Super Admin',
      });
    },
    onSuccess: () => {
      navigate({ to: '/route-c' });
    },
    onError: () => {
      toast.error('Kullanıcı oluşturulurken bir hata gerçekleşti', {
        dismissible: false,
      });
    },
  });

  const form = useForm<NewUserForm>({
    defaultValues: {
      email: 'test@test.com',
      password: '12345678',
      confirmPassword: '12345678',
    },
    mode: 'onSubmit',
  });

  async function onSubmit(data: NewUserForm) {
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
        <FormInputs />
        <button
          type="submit"
          className="btn btn-block mt-6"
        >
          Kayıt Ol ve Giriş Yap
        </button>
      </form>
    </FormProvider>
  );
}

export default SignupForm;
