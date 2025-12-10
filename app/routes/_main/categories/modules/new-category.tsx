import { useState } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import Button from '@app/components/ui/button';
import Drawer from '@app/components/ui/drawer';

import CategoryForm, { type CategoryFormInputs } from './category-form';

function NewCategory() {
  const [isOpen, setIsOpen] = useState(false);

  const queryClient = useQueryClient();

  // const { mutateAsync, isPending } = useMutation({
  //   mutationFn: (data: CategoryFormInputs) => {
  //     // return window.electronAPI.createCategory({
  //     //   name: data.name,
  //     //   email: data.email,
  //     //   password: data.password,
  //     //   role: data.role.value,
  //     //   status: data.isActive ? 'active' : 'passive',
  //     // });
  //   },
  //   onSuccess: response => {
  //     if (response.success) {
  //       setIsOpen(false);
  //       queryClient.invalidateQueries({ queryKey: ['user-list'] });
  //     } else {
  //       toast.error(response.error, {
  //         dismissible: false,
  //       });
  //     }
  //   },
  // });

  const form = useForm<CategoryFormInputs>({
    defaultValues: {
      name: '',
      description: '',
    },
  });

  function onSubmit(data: CategoryFormInputs) {
    // mutateAsync(data);
  }

  return (
    <Drawer
      open={isOpen}
      onOpenChange={open => {
        setIsOpen(open);
        form.reset();
      }}
    >
      <Drawer.Trigger>Kategori Ekle</Drawer.Trigger>
      <Drawer.Content>
        <Drawer.Header>
          <Drawer.Title>Yeni Kategori Oluştur</Drawer.Title>
          <Drawer.Description>Yeni bir kategori oluşturmak için lütfen bilgilerinizi giriniz.</Drawer.Description>
        </Drawer.Header>
        <FormProvider {...form}>
          <form
            id="new-category-form"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <CategoryForm />
          </form>
        </FormProvider>
        <Drawer.Footer>
          <Button
            form="new-category-form"
            type="submit"
            // disabled={isPending}
            // isLoading={isPending}
          >
            Kategoriyi Ekle
          </Button>
        </Drawer.Footer>
      </Drawer.Content>
    </Drawer>
  );
}

export default NewCategory;
