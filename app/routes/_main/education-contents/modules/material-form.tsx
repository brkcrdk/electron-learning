import { Controller, useFormContext } from 'react-hook-form';

import type { FileUploadResponse } from '@api/upload-file-api/types';
import InputField from '@app/components/form-fields/input-field';
import TextareaField from '@app/components/form-fields/textarea-field';
import Field from '@app/components/ui/field';
import type { MediaFileTypes } from '@db/schema';

import CoverImage from './cover-image';

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
  cover_image: FileUploadResponse | null;
  media: FileUploadResponse | null;
  media_type: MediaContentOption;
}

function MaterialForm() {
  const { control } = useFormContext<MaterialFormInputs>();

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
      <CoverImage />
    </Field.Group>
  );
}

export default MaterialForm;
