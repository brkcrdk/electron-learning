import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FormProvider, useForm, useFormState } from 'react-hook-form';
import { toast } from 'sonner';

import Skeleton from '@app/components/ui/skeleton';
import type { CreateEducationPayload, EducationListItem } from '@db/schema';

import ContentForm, { mediaContentOptions, type ContentFormInputs } from '../content-form';

interface Props {
  content: EducationListItem;
}

function EditContent({ content }: Props) {
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: (data: CreateEducationPayload) => {
      return window.electronAPI.updateEducation(data);
    },
    onSuccess: response => {
      if (response.success) {
        queryClient.invalidateQueries({ queryKey: ['education-contents'] });
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
        cover_image: {
          fileSize: content.coverImage.fileSize,
          fileName: content.coverImage.fileName,
          fileFullUrl: content.coverImage.filePath,
          id: content.coverImage.id,
          mediaType: content.coverImage.mediaType,
        },
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
    if (data.cover_image && data.media) {
      mutateAsync({
        id: content.id,
        name: data.name,
        description: data.description,
        contentType: data.media_type.value,
        coverImageId: data.cover_image.id,
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
