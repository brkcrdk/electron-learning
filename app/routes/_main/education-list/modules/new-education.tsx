import { useState } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import Button from '@app/components/ui/button';
import Drawer from '@app/components/ui/drawer';
import type { MutateEducationPayload } from '@db/schema';

import EducationForm, { type EducationFormInputs } from './education-form';

function NewEducation() {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data: MutateEducationPayload) => {
      return window.electronAPI.createEducation(data);
    },
    onSuccess: response => {
      if (response.success) {
        setIsOpen(false);
        queryClient.invalidateQueries({ queryKey: ['education-list'] });
      } else {
        toast.error(response.error, { dismissible: false });
      }
    },
  });

  const form = useForm<EducationFormInputs>({
    defaultValues: {
      name: 'Örnek Eğitim',
      description: 'Örnek eğitim açıklaması',
      category: null,
      educationMaterial: null,
      coverImage: null,
    },
  });

  const onSubmit = (data: EducationFormInputs) => {
    if (!data.category || !data.educationMaterial || !data.assigneeIds.length) return;

    const assigneeIds = data.assigneeIds.flatMap(val => (val ? val.value : []));

    mutateAsync({
      name: data.name,
      description: data.description,
      categoryId: data.category.value,
      educationMaterial: data.educationMaterial.value,
      coverImageId: data.coverImage ? data.coverImage.id : null,
      assigneeIds,
    });
  };

  return (
    <Drawer
      open={isOpen}
      onOpenChange={open => {
        setIsOpen(open);
        form.reset();
      }}
    >
      <Drawer.Trigger>Eğitim Ekle</Drawer.Trigger>
      <Drawer.Content>
        <Drawer.Header>
          <Drawer.Title>Yeni Eğitim Oluştur</Drawer.Title>
          <Drawer.Description>Yeni bir eğitim oluşturmak için lütfen bilgileri giriniz.</Drawer.Description>
        </Drawer.Header>
        <FormProvider {...form}>
          <form
            id="new-education-form"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <EducationForm />
          </form>
        </FormProvider>
        <Drawer.Footer>
          <Button
            form="new-education-form"
            type="submit"
            disabled={isPending}
            isLoading={isPending}
          >
            Eğitim Oluştur
          </Button>
        </Drawer.Footer>
      </Drawer.Content>
    </Drawer>
  );
}

export default NewEducation;
