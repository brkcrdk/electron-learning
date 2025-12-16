import { useMutation } from '@tanstack/react-query';
import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router';
import { FormProvider, useForm } from 'react-hook-form';

import Button from '@app/components/ui/button';
import Field from '@app/components/ui/field';

import AuthLayout from './modules/auth-layout';
import FormInputs, { type SignupFormInputsProps } from './modules/form-inputs';

export const Route = createFileRoute('/_auth/signup')({
  component: RouteComponent,
  beforeLoad: async () => {
    const currentUser = await window.electronAPI.getCurrentUser();
    if (currentUser.success) {
      throw redirect({ to: '/', replace: true });
    } else {
      const response = await window.electronAPI.checkSuperAdminExists();
      if (response.success) {
        throw redirect({ to: '/login', replace: true });
      }
    }
  },
});

function RouteComponent() {
  const navigate = useNavigate();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data: SignupFormInputsProps) => {
      return window.electronAPI.createSuperAdmin({
        username: data.username,
        password: data.password,
        name: data.name,
      });
    },
    onSuccess: () => {
      navigate({ to: '/', replace: true });
    },
  });

  const form = useForm<SignupFormInputsProps>({
    defaultValues: {
      name: 'Super Admin',
      username: 'super_admin',
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
          id="signup-form"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <Field.Group>
            <FormInputs mode="signup" />
            <Button
              type="submit"
              disabled={isPending}
              isLoading={isPending}
            >
              Kayıt Ol ve Giriş Yap
            </Button>
          </Field.Group>
        </form>
      </FormProvider>
    </AuthLayout>
  );
}
