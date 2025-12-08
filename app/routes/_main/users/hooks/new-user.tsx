import { FormProvider, useForm } from 'react-hook-form';

import Drawer from '@app/components/ui/drawer';

import type { UserFormInputs } from './user-form';
import UserForm from './user-form';

function NewUser() {
  const form = useForm<UserFormInputs>({});
  return (
    <Drawer
      drawerId="new-user-drawer"
      triggerProps={{ children: 'Kullanıcı Ekle' }}
    >
      <Drawer.Header title="Yeni Kullanıcı Oluştur" />
      <FormProvider {...form}>
        <UserForm />
      </FormProvider>
    </Drawer>
  );
}

export default NewUser;
