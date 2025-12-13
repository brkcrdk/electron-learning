import { useMutation } from '@tanstack/react-query';
import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import Button from '@app/components/ui/button';
import Field from '@app/components/ui/field';

import AuthLayout from './modules/auth-layout';
import type { LoginFormInputsProps } from './modules/form-inputs';
import FormInputs from './modules/form-inputs';

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
    onSuccess: response => {
      if (response.success) {
        navigate({ to: '/', replace: true });
      } else {
        toast.error(response.error, {
          dismissible: false,
        });
      }
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
          onSubmit={form.handleSubmit(onSubmit)}
          id="login-form"
        >
          <Field.Group>
            <FormInputs mode="login" />
            <Button
              type="submit"
              disabled={isPending}
              isLoading={isPending}
            >
              Giriş Yap
            </Button>
          </Field.Group>
        </form>
      </FormProvider>
    </AuthLayout>
  );
}
