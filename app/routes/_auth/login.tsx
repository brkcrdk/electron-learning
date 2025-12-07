import { useMutation } from '@tanstack/react-query';
import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import AuthLayout from './modules/auth-layout';
import FormInputs, { type LoginFormInputsProps } from './modules/form-inputs';

export const Route = createFileRoute('/_auth/login')({
  component: RouteComponent,
  beforeLoad: async () => {
    const currentUser = await window.electronAPI.getCurrentUser();
    if (currentUser.success) {
      throw redirect({ to: '/', replace: true });
    } else {
      const response = await window.electronAPI.checkSuperAdminExists();
      if (!response.success) {
        throw redirect({ to: '/signup', replace: true });
      }
    }
  },
});

function RouteComponent() {
  const navigate = useNavigate();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data: LoginFormInputsProps) => {
      return window.electronAPI.login({
        email: data.email,
        password: data.password,
      });
    },
    onSuccess: data => {
      console.log(data);
      navigate({ to: '/', replace: true });
    },
    onError: error => {
      toast.error(error.message, {
        dismissible: false,
      });
    },
  });

  const form = useForm<LoginFormInputsProps>({
    defaultValues: {
      email: 'test@test.com',
      password: '12345678',
    },
    mode: 'onSubmit',
  });

  async function onSubmit(data: LoginFormInputsProps) {
    await mutateAsync(data);
  }

  return (
    <AuthLayout actionMode="login">
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
    </AuthLayout>
  );
}
