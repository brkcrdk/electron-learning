import { Controller, useFormContext } from 'react-hook-form';

import type { FileUploadResponse } from '@api/upload-file-api/types';
import InputField from '@app/components/form-fields/input-field';
import TextareaField from '@app/components/form-fields/textarea-field';
import Field from '@app/components/ui/field';
import Select from '@app/components/ui/select';
import type { MediaFileTypes } from '@db/schema';

import ContentUploader from './content-uploader';
import CoverImage from './cover-image';

export interface MediaContentOption {
  label: string;
  value: MediaFileTypes;
}

export const mediaContentOptions: MediaContentOption[] = [
  { label: 'Video İçeriği', value: 'video' },
  { label: 'Articulate İçeriği', value: 'stories' },
  { label: 'PDF İçeriği', value: 'pdfs' },
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
        name="media_type"
        rules={{ required: 'İçerik tipi alanı zorunludur' }}
        render={({ field, fieldState }) => (
          <Select
            label="İçerik Tipi:"
            id="media_type"
            placeholder="İçerik Tipi"
            errorMessage={fieldState.error?.message}
            options={mediaContentOptions}
            getOptionLabel={val => val.label}
            getOptionValue={val => val.value}
            {...field}
          />
        )}
      />
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
      <ContentUploader />
    </Field.Group>
  );
}

export default MaterialForm;
