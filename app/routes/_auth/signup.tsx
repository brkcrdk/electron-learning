import { useMutation } from '@tanstack/react-query';
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import AuthLayout from './modules/auth-layout';
import FormInputs, { type SignupFormInputsProps } from './modules/form-inputs';

export const Route = createFileRoute('/_auth/signup')({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data: SignupFormInputsProps) => {
      return window.electronAPI.createSuperAdmin({
        email: data.email,
        password: data.password,
        name: 'Super Admin',
      });
    },
    onSuccess: () => {
      navigate({ to: '/' });
    },
    onError: () => {
      toast.error('Kullanıcı oluşturulurken bir hata gerçekleşti', {
        dismissible: false,
      });
    },
  });

  const form = useForm<SignupFormInputsProps>({
    defaultValues: {
      email: 'test@test.com',
      password: '12345678',
      confirmPassword: '12345678',
    },
    mode: 'onSubmit',
  });

  async function onSubmit(data: SignupFormInputsProps) {
    await mutateAsync(data);
  }

  return (
    <AuthLayout actionMode="signup">
      <FormProvider {...form}>
        <form
          aria-disabled={isPending}
          className="aria-disabled:disable-interactions space-y-4"
          name="welcome-form"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormInputs mode="signup" />
        </form>
      </FormProvider>
      <Link to="/login">Giriş Yap</Link>
    </AuthLayout>
  );
}
