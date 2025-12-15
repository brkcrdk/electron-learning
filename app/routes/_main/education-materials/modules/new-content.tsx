import { useState } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import Button from '@app/components/ui/button';
import Drawer from '@app/components/ui/drawer';
import type { CreateEducationMaterialsPayload } from '@db/schema';

import type { ContentFormInputs } from './content-form';
import ContentForm, { mediaContentOptions } from './content-form';

function NewContent() {
  const [isOpen, setIsOpen] = useState(false);

  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data: CreateEducationMaterialsPayload) => {
      return window.electronAPI.createEducationMaterial(data);
    },
    onSuccess: response => {
      if (response.success) {
        setIsOpen(false);
        queryClient.invalidateQueries({ queryKey: ['education-materials'] });
      } else {
        toast.error(response.error, {
          dismissible: false,
        });
      }
    },
  });

  const form = useForm<ContentFormInputs>({
    defaultValues: {
      name: 'Deneme Eğitim İçeriği',
      description: 'Deneme Eğitim İçeriği açıklaması',
      cover_image: null,
      media: null,
      media_type: mediaContentOptions[0],
    },
  });

  const onSubmit = (data: ContentFormInputs) => {
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
            id="new-content-form"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <ContentForm />
          </form>
        </FormProvider>
        <Drawer.Footer>
          <Button
            form="new-content-form"
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

export default NewContent;
