import { useState } from 'react';

import { FormProvider, useForm } from 'react-hook-form';

import Button from '@app/components/ui/button';
import Drawer from '@app/components/ui/drawer';

import type { MaterialFormInputs } from './material-form';
import MaterialForm, { mediaContentOptions } from './material-form';

function NewMaterial() {
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<MaterialFormInputs>({
    defaultValues: {
      name: '',
      description: '',
      cover_image: null,
      media: null,
      media_type: mediaContentOptions[0],
    },
  });

  const onSubmit = (data: MaterialFormInputs) => {
    console.log(data);
  };

  return (
    <Drawer
      open={isOpen}
      onOpenChange={open => {
        setIsOpen(open);
        form.reset();
      }}
    >
      <Drawer.Trigger>Eğitim İçeriği Ekle</Drawer.Trigger>
      <Drawer.Content>
        <Drawer.Header>
          <Drawer.Title>Yeni Eğitim İçeriği Oluştur</Drawer.Title>
          <Drawer.Description>Yeni bir eğitim içeriği oluşturmak için lütfen içerik bilgilerini giriniz.</Drawer.Description>
        </Drawer.Header>
        <FormProvider {...form}>
          <form
            id="new-material-form"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <MaterialForm />
          </form>
        </FormProvider>
        <Drawer.Footer>
          <Button
            form="new-material-form"
            type="submit"
            // disabled={isPending}
            // isLoading={isPending}
          >
            Eğitim İçeriği Ekle
          </Button>
        </Drawer.Footer>
      </Drawer.Content>
    </Drawer>
  );
}

export default NewMaterial;
