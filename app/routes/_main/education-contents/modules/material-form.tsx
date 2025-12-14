import { Controller, useFormContext } from 'react-hook-form';

import FileUploadField from '@app/components/form-fields/file-upload-field';
import InputField from '@app/components/form-fields/input-field';
import TextareaField from '@app/components/form-fields/textarea-field';
import Field from '@app/components/ui/field';
import useFileUpload from '@app/hooks/use-file-upload';
import type { MediaFileTypes } from '@db/schema';

export interface MediaContentOption {
  label: string;
  value: MediaFileTypes;
}

export const mediaContentOptions: MediaContentOption[] = [
  { label: 'Video', value: 'video' },
  { label: 'Stories', value: 'stories' },
  { label: 'PDFs', value: 'pdfs' },
];

export interface MaterialFormInputs {
  name: string;
  description: string;
  cover_image: string;
  media_type: MediaContentOption;
  media_url: string;
}

function MaterialForm() {
  const { control } = useFormContext<MaterialFormInputs>();

  const { handleUpload, uploadState, resetUploadState } = useFileUpload({
    uploadType: 'video',
    onProgress: progress => {
      console.log(progress);
    },
    onComplete: completed => {
      console.log(completed.response);
    },
  });

  return (
    <Field.Group>
      <Controller
        control={control}
        name="name"
        rules={{ required: 'İçerik adı alanı zorunludur' }}
        render={({ field, fieldState }) => (
          <InputField
            label="İçerik Adı:"
            id="name"
            placeholder="İçerik Adı"
            error={fieldState.error?.message}
            {...field}
          />
        )}
      />
      <Controller
        control={control}
        name="description"
        rules={{ required: 'İçerik açıklaması alanı zorunludur' }}
        render={({ field, fieldState }) => (
          <TextareaField
            label="Açıklama:"
            id="description"
            placeholder="İçerik hakkında kısa bir açıklama yazınız..."
            error={fieldState.error?.message}
            {...field}
          />
        )}
      />
      <FileUploadField
        label="Kapak Resmi:"
        inputId="cover_image"
        uploadProviderProps={{
          onChange: handleUpload,
          accept: 'video/*',
          sizeLimit: 100,
        }}
        uploadingProgress={uploadState}
        onReset={resetUploadState}
      />
    </Field.Group>
  );
}

export default MaterialForm;
