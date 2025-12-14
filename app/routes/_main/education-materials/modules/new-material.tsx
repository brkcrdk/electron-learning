import { useState } from 'react';

import Button from '@app/components/ui/button';
import Drawer from '@app/components/ui/drawer';

function NewMaterial() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Drawer
      open={isOpen}
      onOpenChange={open => {
        setIsOpen(open);
        // form.reset();
      }}
    >
      <Drawer.Trigger>Eğitim İçeriği Ekle</Drawer.Trigger>
      <Drawer.Content>
        <Drawer.Header>
          <Drawer.Title>Yeni Eğitim İçeriği Oluştur</Drawer.Title>
          <Drawer.Description>Yeni bir eğitim içeriği oluşturmak için lütfen bilgilerinizi giriniz.</Drawer.Description>
        </Drawer.Header>
        {/* <FormProvider {...form}>
          <form
            id="new-category-form"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <CategoryForm />
          </form>
        </FormProvider> */}
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
