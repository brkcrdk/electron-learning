import { useState } from 'react';

import { FormProvider, useForm } from 'react-hook-form';

import Button from '@app/components/ui/button';
import Drawer from '@app/components/ui/drawer';

import AssigmentForm, { type AssigmentFormProps } from './assigment-form';

function NewAssigment() {
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<AssigmentFormProps>({
    defaultValues: {
      selectedUsers: {},
      selectedEducation: null,
    },
  });

  function onSubmit(data: AssigmentFormProps) {
    console.log(data);
  }

  return (
    <Drawer
      open={isOpen}
      onOpenChange={open => {
        setIsOpen(open);
        form.reset();
      }}
    >
      <Drawer.Trigger>Eğitim Ataması Yap</Drawer.Trigger>
      <Drawer.Content className="min-w-160">
        <Drawer.Header>
          <Drawer.Title>Yeni Eğitim Ataması Yap</Drawer.Title>
          <Drawer.Description>Yeni bir eğitim ataması yapılacak kişileri seçiniz..</Drawer.Description>
        </Drawer.Header>
        <FormProvider {...form}>
          <form
            id="new-assigment-form"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <AssigmentForm />
          </form>
        </FormProvider>
        <Drawer.Footer>
          <Button
            form="new-assigment-form"
            type="submit"
          >
            Eğitim Ataması Yap
          </Button>
        </Drawer.Footer>
      </Drawer.Content>
    </Drawer>
  );
}

export default NewAssigment;
