import { useState } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import Button from '@app/components/ui/button';
import Drawer from '@app/components/ui/drawer';
import Icon from '@app/components/ui/icon';
import useCurrentUserQuery from '@app/hooks/use-current-user-query';
import type { User } from '@db/schema';

import type { UserFormInputs } from './user-form';
import UserForm, { userRoleOptions } from './user-form';

interface EditUserProps {
  user: User;
}

function EditUser({ user }: EditUserProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { data: currentUser } = useCurrentUserQuery();

  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
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
        setIsOpen(false);
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
        isActive: true,
      };
    },
  });

  function onSubmit(data: UserFormInputs) {
    mutateAsync(data);
  }

  return (
    <Drawer
      open={isOpen}
      onOpenChange={open => {
        setIsOpen(open);
        form.reset();
      }}
    >
      <Drawer.Trigger size="icon-sm">
        <Icon
          name="pencil"
          className="size-4"
        />
      </Drawer.Trigger>
      <Drawer.Content>
        <Drawer.Header>
          <Drawer.Title>Kullanıcı Bilgilerini Düzenle</Drawer.Title>
          <Drawer.Description>Kullanıcı bilgilerini düzenlemek için lütfen bilgilerinizi giriniz.</Drawer.Description>
        </Drawer.Header>
        <FormProvider {...form}>
          <form
            id="new-user-form"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <UserForm isSelfUpdate={currentUser ? currentUser.id === user.id : false} />
          </form>
        </FormProvider>
        <Drawer.Footer>
          <Button
            form="new-user-form"
            type="submit"
            disabled={isPending}
            isLoading={isPending}
          >
            Kullanıcıyı Düzenle
          </Button>
        </Drawer.Footer>
      </Drawer.Content>
    </Drawer>
  );
}

export default EditUser;
