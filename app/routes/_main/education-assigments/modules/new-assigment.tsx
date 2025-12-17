import { useState } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import Button from '@app/components/ui/button';
import Drawer from '@app/components/ui/drawer';
import type { MutateEducationAssignmentPayload } from '@db/schema';

import AssigmentForm, { type AssigmentFormProps } from './assigment-form';

function NewAssigment() {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data: MutateEducationAssignmentPayload) => {
      return window.electronAPI.createEducationAssignment(data);
    },
    onSuccess: response => {
      if (response.success) {
        setIsOpen(false);
        queryClient.invalidateQueries({ queryKey: ['education-assigments'] });
      } else {
        toast.error(response.error, { dismissible: false });
      }
    },
  });

  const form = useForm<AssigmentFormProps>({
    defaultValues: {
      selectedUsers: {},
      selectedEducation: null,
    },
  });

  function onSubmit(data: AssigmentFormProps) {
    if (!data.selectedEducation) return;

    mutateAsync({
      educationId: data.selectedEducation.id,
      assigneeUserIds: Object.keys(data.selectedUsers).map(Number),
    });
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
            disabled={isPending}
            isLoading={isPending}
          >
            Eğitim Ataması Yap
          </Button>
        </Drawer.Footer>
      </Drawer.Content>
    </Drawer>
  );
}

export default NewAssigment;
