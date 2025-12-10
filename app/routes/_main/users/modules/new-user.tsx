// import { Dialog } from 'radix-ui';
// import { FormProvider, useForm } from 'react-hook-form';

import Button from '@app/components/ui/button';
import Drawer from '@app/components/ui/drawer';

// import Drawer from '@app/components/ui/drawer';

// import type { UserFormInputs } from './user-form';
// import UserForm from './user-form';

function NewUser() {
  // const form = useForm<UserFormInputs>({
  //   defaultValues: {
  //     name: '',
  //     email: '',
  //     password: '',
  //     roles: 'user',
  //     isActive: true,
  //   },
  // });

  return (
    // <Drawer
    //   triggerProps={{ children: 'Kullanıcı Ekle' }}
    //   rootProps={{
    //     onOpenChange: open => {
    //       if (!open) {
    //         form.reset();
    //       }
    //     },
    //   }}
    // >
    //   <Drawer.Header
    //     title="Yeni Kullanıcı Oluştur"
    //     description="Yeni bir kullanıcı oluşturmak için lütfen bilgilerinizi giriniz."
    //   />
    //   <FormProvider {...form}>
    //     <UserForm onSubmit={values => console.log('values', values)} />
    //   </FormProvider>
    //   <Drawer.Footer>
    //     <Dialog.Close className="btn btn-soft flex-1">Kapat</Dialog.Close>
    //     <button
    //       form="user-form-inputs"
    //       type="submit"
    //       className="btn btn-primary btn-soft flex-1"
    //     >
    //       Kaydet
    //     </button>
    //   </Drawer.Footer>
    // </Drawer>
    <Drawer>
      <Drawer.Trigger>Kullanıcı Ekle</Drawer.Trigger>
      <Drawer.Content>
        <Drawer.Header>
          <Drawer.Title>Yeni Kullanıcı Oluştur</Drawer.Title>
          <Drawer.Description>Yeni bir kullanıcı oluşturmak için lütfen bilgilerinizi giriniz.</Drawer.Description>
        </Drawer.Header>
        <Drawer.Footer>
          <Button>Kullanıcıyı Ekle</Button>
        </Drawer.Footer>
      </Drawer.Content>
    </Drawer>
  );
}

export default NewUser;
