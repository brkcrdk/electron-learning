import { createFileRoute, redirect } from '@tanstack/react-router';
import { FormProvider, useForm } from 'react-hook-form';

import Button from '@app/components/ui/button';
import Field from '@app/components/ui/field';
import useSignupMutation from '@app/services/use-signup-mutation';

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
  const { mutateAsync, isPending } = useSignupMutation();

  const form = useForm<SignupFormInputsProps>({
    defaultValues: {
      name: 'Super Admin',
      email: 'test@test.com',
      password: '12345678',
      confirmPassword: '12345678',
    },
    mode: 'onSubmit',
  });

  async function onSubmit(data: SignupFormInputsProps) {
    await mutateAsync({
      email: data.email,
      password: data.password,
      name: data.name,
    });
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
