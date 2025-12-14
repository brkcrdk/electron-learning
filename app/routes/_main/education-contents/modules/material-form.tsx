import { Controller, useFormContext } from 'react-hook-form';

import InputField from '@app/components/form-fields/input-field';
import TextareaField from '@app/components/form-fields/textarea-field';
import Field from '@app/components/ui/field';
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
    </Field.Group>
  );
}

export default MaterialForm;

// isim, cover_image, media_type, media_url
