import { Dialog } from 'radix-ui';
import { FormProvider, useForm } from 'react-hook-form';

import Drawer from '@app/components/ui/drawer';

import type { UserFormInputs } from './user-form';
import UserForm from './user-form';

function NewUser() {
  const form = useForm<UserFormInputs>({});
  return (
    // <Drawer
    //   drawerId="new-user-drawer"
    //   triggerProps={{ children: 'Kullanıcı Ekle' }}
    // >
    //   <Drawer.Header title="Yeni Kullanıcı Oluştur" />
    //   <FormProvider {...form}>
    //     <UserForm onSubmit={values => console.log('values', values)} />
    //   </FormProvider>
    // </Drawer>
    <Drawer triggerProps={{ children: 'Kullanıcı Ekle' }}>
      <Drawer.Header
        title="Yeni Kullanıcı Oluştur"
        description="Yeni bir kullanıcı oluşturmak için lütfen bilgilerinizi giriniz."
      />
      qwewqewqel;qwe
      <Drawer.Footer>
        <Dialog.Close className="btn btn-soft btn-accent flex-1">Kapat</Dialog.Close>
        <button className="btn btn-primary flex-1">Kaydet</button>
      </Drawer.Footer>
    </Drawer>
  );
}

export default NewUser;
