import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FormProvider, useForm, useFormState } from 'react-hook-form';
import { toast } from 'sonner';

import Skeleton from '@app/components/ui/skeleton';
import type { CreateEducationMaterialsPayload, EducationMaterialsListItem } from '@db/schema';

import ContentForm, { mediaContentOptions, type ContentFormInputs } from '../content-form';

interface Props {
  content: EducationMaterialsListItem;
}

function EditContent({ content }: Props) {
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: (data: CreateEducationMaterialsPayload) => {
      return window.electronAPI.updateEducationMaterial(data);
    },
    onSuccess: response => {
      if (response.success) {
        queryClient.invalidateQueries({ queryKey: ['education-materials'] });
      } else {
        toast.error(response.error, { dismissible: false });
      }
    },
  });

  const form = useForm<ContentFormInputs>({
    defaultValues: async () => {
      const selectedMediaType = mediaContentOptions.find(option => option.value === content.contentType);
      return {
        name: content.name,
        description: content.description,
        media: {
          fileSize: content.contentFile.fileSize,
          fileName: content.contentFile.fileName,
          fileFullUrl: content.contentFile.filePath,
          id: content.contentFile.id,
          mediaType: content.contentFile.mediaType,
        },
        media_type: selectedMediaType ? selectedMediaType : mediaContentOptions[0],
      };
    },
  });

  function onSubmit(data: ContentFormInputs) {
    if (data.media) {
      mutateAsync({
        id: content.id,
        name: data.name,
        description: data.description,
        contentType: data.media_type.value,
        contentFileId: data.media.id,
      });
    }
  }

  const { isLoading } = useFormState({ control: form.control });

  if (isLoading) {
    return <Skeleton />;
  }

  return (
    <FormProvider {...form}>
      <form
        id="edit-content-form"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <ContentForm />
      </form>
    </FormProvider>
  );
}

export default EditContent;
