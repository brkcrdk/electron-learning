// import { Dialog } from 'radix-ui';

import { FormProvider, useForm } from 'react-hook-form';

import Button from '@app/components/ui/button';
import Drawer from '@app/components/ui/drawer';

import type { UserFormInputs } from './user-form';

function NewUser() {
  const form = useForm<UserFormInputs>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      roles: 'user',
      isActive: true,
    },
  });

  function onSubmit(data: UserFormInputs) {
    console.log('data', data);
  }

  return (
    <Drawer>
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
          />
        </FormProvider>
        <Drawer.Footer>
          <Button
            form="new-user-form"
            type="submit"
          >
            Kullanıcıyı Ekle
          </Button>
        </Drawer.Footer>
      </Drawer.Content>
    </Drawer>
  );
}

export default NewUser;
