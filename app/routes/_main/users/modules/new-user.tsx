import { useState } from 'react';

import { useMutation } from '@tanstack/react-query';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import Button from '@app/components/ui/button';
import Drawer from '@app/components/ui/drawer';

import type { UserFormInputs } from './user-form';
import UserForm from './user-form';

function NewUser() {
  const [isOpen, setIsOpen] = useState(false);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data: UserFormInputs) => {
      return window.electronAPI.createUser({
        name: data.name,
        email: data.email,
        password: data.password,
        roles: data.roles.value,
        status: data.isActive ? 'active' : 'passive',
      });
    },
    onSuccess: () => {
      toast.success('Kullanıcı başarıyla oluşturuldu.');
    },
    onError: error => {
      toast.error(error.message, {
        dismissible: false,
      });
    },
  });
  const form = useForm<UserFormInputs>({
    defaultValues: {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: '12345678',
      roles: { label: 'User', value: 'user' },
      isActive: true,
    },
  });

  async function onSubmit(data: UserFormInputs) {
    await mutateAsync(data);
    setIsOpen(false);
  }

  return (
    <Drawer
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <Drawer.Trigger>Kullanıcı Ekle</Drawer.Trigger>
      <Drawer.Content>
        <Drawer.Header>
          <Drawer.Title>Yeni Kullanıcı Oluştur</Drawer.Title>
          <Drawer.Description>Yeni bir kullanıcı oluşturmak için lütfen bilgilerinizi giriniz.</Drawer.Description>
        </Drawer.Header>
        <FormProvider {...form}>
          <form
            id="new-user-form"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <UserForm />
          </form>
        </FormProvider>
        <Drawer.Footer>
          <Button
            form="new-user-form"
            type="submit"
            disabled={isPending}
            isLoading={isPending}
          >
            Kullanıcıyı Ekle
          </Button>
        </Drawer.Footer>
      </Drawer.Content>
    </Drawer>
  );
}

export default NewUser;
