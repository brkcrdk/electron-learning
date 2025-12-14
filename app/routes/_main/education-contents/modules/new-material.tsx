import { useState } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import Button from '@app/components/ui/button';
import Drawer from '@app/components/ui/drawer';
import type { CreateEducationPayload } from '@db/schema';

import type { MaterialFormInputs } from './material-form';
import MaterialForm, { mediaContentOptions } from './material-form';

function NewMaterial() {
  const [isOpen, setIsOpen] = useState(false);

  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data: CreateEducationPayload) => {
      return window.electronAPI.createEducation(data);
    },
    onSuccess: response => {
      if (response.success) {
        setIsOpen(false);
        queryClient.invalidateQueries({ queryKey: ['education-contents'] });
      } else {
        toast.error(response.error, {
          dismissible: false,
        });
      }
    },
  });

  const form = useForm<MaterialFormInputs>({
    defaultValues: {
      name: 'Deneme Eğitim İçeriği',
      description: 'Deneme Eğitim İçeriği açıklaması',
      cover_image: null,
      media: null,
      media_type: mediaContentOptions[0],
    },
  });

  const onSubmit = (data: MaterialFormInputs) => {
    if (data.cover_image && data.media) {
      mutateAsync({
        name: data.name,
        description: data.description,
        contentType: data.media_type.value,
        coverImageId: data.cover_image.id,
        contentFileId: data.media.id,
      });
    }
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
            disabled={isPending}
            isLoading={isPending}
          >
            Eğitim İçeriği Ekle
          </Button>
        </Drawer.Footer>
      </Drawer.Content>
    </Drawer>
  );
}

export default NewMaterial;
