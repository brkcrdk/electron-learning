import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FormProvider, useForm, useFormState } from 'react-hook-form';
import { toast } from 'sonner';

import Skeleton from '@app/components/ui/skeleton';
import useCurrentUserQuery from '@app/hooks/use-current-user-query';
import type { User } from '@db/schema';

import type { UserFormInputs } from '../user-form';
import UserForm, { userRoleOptions } from '../user-form';

interface Props {
  user: User;
}

function EditUser({ user }: Props) {
  const queryClient = useQueryClient();
  const { data: currentUser } = useCurrentUserQuery();

  const { mutateAsync } = useMutation({
    mutationFn: (data: UserFormInputs) => {
      return window.electronAPI.updateUser({
        id: user.id,
        name: data.name,
        email: data.email,
        password: data.password,
        role: data.role.value,
        status: data.isActive ? 'active' : 'passive',
      });
    },
    onSuccess: response => {
      if (response.success) {
        queryClient.invalidateQueries({ queryKey: ['user-list'] });
      } else {
        toast.error(response.error, { dismissible: false });
      }
    },
  });

  const form = useForm<UserFormInputs>({
    defaultValues: async () => {
      const selectedUserRole = userRoleOptions.find(role => role.value === user.role);

      return {
        name: user.name,
        email: user.email,
        password: '12345678',
        role: selectedUserRole ? selectedUserRole : userRoleOptions[0],
        isActive: user.status === 'active',
      };
    },
  });

  function onSubmit(data: UserFormInputs) {
    mutateAsync(data);
  }

  const { isLoading } = useFormState({ control: form.control });

  if (isLoading) {
    return <Skeleton />;
  }

  return (
    <FormProvider {...form}>
      <form
        id="edit-user-form"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <UserForm isSelfUpdate={currentUser ? currentUser.id === user.id : false} />
      </form>
    </FormProvider>
  );
}

export default EditUser;
