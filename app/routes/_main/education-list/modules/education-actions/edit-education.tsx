import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FormProvider, useForm, useFormState } from 'react-hook-form';
import { toast } from 'sonner';

import Skeleton from '@app/components/ui/skeleton';
import queryKeys from '@app/services/query-keys';
import type { MutateEducationPayload } from '@db/schema';
import type { EducationListItem } from '@db/schema';

import EducationForm, { type EducationFormInputs } from '../education-form';

interface Props {
  education: EducationListItem;
}

function EditEducation({ education }: Props) {
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: (data: MutateEducationPayload) => {
      return window.electronAPI.updateEducation(data);
    },
    onSuccess: response => {
      if (response.success) {
        queryClient.invalidateQueries({ queryKey: [queryKeys.educationListQuery] });
      } else {
        toast.error(response.error, { dismissible: false });
      }
    },
  });

  const form = useForm<EducationFormInputs>({
    defaultValues: async () => ({
      name: education.name,
      description: education.description,
      category: education.category,
      educationMaterial: {
        label: education.educationMaterial.name,
        value: education.educationMaterial.id,
      },
      coverImage: education.coverImage
        ? {
            id: education.coverImage.id,
            mediaType: education.coverImage.mediaType,
            fileName: education.coverImage.fileName,
            fileFullUrl: education.coverImage.filePath,
            fileSize: education.coverImage.fileSize,
          }
        : null,
    }),
  });

  const onSubmit = (data: EducationFormInputs) => {
    if (!data.category || !data.educationMaterial) return;

    mutateAsync({
      id: education.id,
      name: data.name,
      description: data.description,
      categoryId: data.category.id,
      educationMaterial: data.educationMaterial.value,
      coverImageId: data.coverImage?.id ?? null,
    });
  };

  const { isLoading } = useFormState({ control: form.control });

  if (isLoading) {
    return <Skeleton />;
  }

  return (
    <FormProvider {...form}>
      <form
        id="edit-education-form"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <EducationForm />
      </form>
    </FormProvider>
  );
}

export default EditEducation;
