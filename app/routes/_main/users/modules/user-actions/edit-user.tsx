import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { FormProvider, useForm, useFormState } from 'react-hook-form';
import { toast } from 'sonner';

import Skeleton from '@app/components/ui/skeleton';
import currentUserQuery from '@app/services/current-user-query';
import queryKeys from '@app/services/query-keys';
import type { User } from '@db/schema';

import type { UserFormInputs } from '../user-form';
import UserForm, { userRoleOptions } from '../user-form';

interface Props {
  user: User;
}

function EditUser({ user }: Props) {
  const queryClient = useQueryClient();
  const { data: currentUser } = useQuery(currentUserQuery);

  const { mutateAsync } = useMutation({
    mutationFn: (data: UserFormInputs) => {
      return window.electronAPI.updateUser({
        id: user.id,
        name: data.name,
        username: data.username,
        password: data.password,
        role: data.role.value,
        status: data.isActive ? 'active' : 'passive',
      });
    },
    onSuccess: response => {
      if (response.success) {
        queryClient.invalidateQueries({ queryKey: [queryKeys.paginatedUserListQuery] });
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
        username: user.username,
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
