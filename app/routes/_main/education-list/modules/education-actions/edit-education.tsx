import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import type { NewEducationPayload } from '@db/schema';
import type { EducationListItem } from '@db/schema';

import EducationForm, { type EducationFormInputs } from '../education-form';
import mapCoverImageToUploadResponse from '../utils/map-cover-image';

interface Props {
  education: EducationListItem;
}

function EditEducation({ education }: Props) {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data: NewEducationPayload) => {
      return window.electronAPI.updateEducation(data);
    },
    onSuccess: response => {
      if (response.success) {
        queryClient.invalidateQueries({ queryKey: ['education-list'] });
      } else {
        toast.error(response.error, { dismissible: false });
      }
    },
  });

  const form = useForm<EducationFormInputs>({
    defaultValues: async () => ({
      name: education.name,
      description: education.description,
      category: { label: education.category.name, value: education.category.id },
      educationMaterial: { label: education.educationMaterial.name, value: education.educationMaterial.id },
      coverImage: mapCoverImageToUploadResponse(education.coverImage),
    }),
  });

  const onSubmit = (data: EducationFormInputs) => {
    if (!data.category || !data.educationMaterial || !data.coverImage) return;

    mutateAsync({
      id: education.id,
      name: data.name,
      description: data.description,
      categoryId: data.category.value,
      educationMaterial: data.educationMaterial.value,
      coverImageId: data.coverImage.id,
    });
  };

  return (
    <FormProvider {...form}>
      <form
        id="edit-education-form"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <EducationForm education={education} />
      </form>
    </FormProvider>
  );
}

export default EditEducation;
