import { useMutation } from '@tanstack/react-query';
import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import AuthLayout from './modules/auth-layout';
import FormInputs, { type SignupFormInputsProps } from './modules/form-inputs';

export const Route = createFileRoute('/_auth/signup')({
  component: RouteComponent,
  beforeLoad: async () => {
    const currentUser = await window.electronAPI.getCurrentUser();
    if (currentUser.success) {
      throw redirect({ to: '/' });
    } else {
      const response = await window.electronAPI.checkSuperAdminExists();
      if (response.success) {
        throw redirect({ to: '/login' });
      }
    }
  },
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
          <button
            type="submit"
            className="btn btn-block mt-6"
          >
            Kayıt Ol ve Giriş Yap
          </button>
        </form>
      </FormProvider>
    </AuthLayout>
  );
}
