import { Controller, useFormContext, useWatch } from 'react-hook-form';

import type { FileUploadResponse } from '@api/upload-file-api/types';
import FileUploadField from '@app/components/form-fields/file-upload-field';
import InputField from '@app/components/form-fields/input-field';
import TextareaField from '@app/components/form-fields/textarea-field';
import Field from '@app/components/ui/field';
import useFileUpload from '@app/hooks/use-file-upload';
import type { Category, EducationMaterialsListItem } from '@db/schema';

import CategorySelector from './category-selector';
import MaterialSelector from './material-selector';

type SelectOption<TValue> = {
  label: string;
  value: TValue;
} | null;

export interface EducationFormInputs {
  name: string;
  description: string;
  category: SelectOption<Category['id']>;
  educationMaterial: SelectOption<EducationMaterialsListItem['id']>;
  coverImage: FileUploadResponse | null;
}

function EducationForm() {
  const { control, setValue, trigger } = useFormContext<EducationFormInputs>();

  const coverImage = useWatch({ control, name: 'coverImage' });

  const { handleUpload, uploadState, resetUploadState } = useFileUpload({
    uploadType: 'images',
    onComplete: completed => {
      setValue('coverImage', completed.response);
      trigger('coverImage');
    },
    defaultUploadState: coverImage
      ? {
          status: 'completed',
          progress: 100,
          progressId: crypto.randomUUID(),
          file: new File([], coverImage.fileName),
          response: coverImage,
        }
      : undefined,
  });

  return (
    <Field.Group>
      <Controller
        control={control}
        name="name"
        rules={{ required: 'Eğitim adı alanı zorunludur' }}
        render={({ field, fieldState }) => (
          <InputField
            label="Eğitim Adı:"
            placeholder="Eğitim Adı"
            error={fieldState.error?.message}
            {...field}
          />
        )}
      />

      <Controller
        control={control}
        name="description"
        rules={{ required: 'Açıklama alanı zorunludur' }}
        render={({ field, fieldState }) => (
          <TextareaField
            label="Açıklama:"
            placeholder="Eğitim hakkında kısa bir açıklama yazınız..."
            error={fieldState.error?.message}
            {...field}
          />
        )}
      />

      <CategorySelector />
      <MaterialSelector />

      <Controller
        control={control}
        name="coverImage"
        render={({ fieldState }) => (
          <FileUploadField
            label="Kapak Görseli:"
            inputId="coverImage"
            error={fieldState.error?.message}
            uploadingProgress={uploadState}
            uploadProviderProps={{
              onChange: handleUpload,
              accept: 'image/*',
              sizeLimit: 10,
            }}
            onReset={existingId => {
              resetUploadState(existingId);
              setValue('coverImage', null);
            }}
          />
        )}
      />
    </Field.Group>
  );
}

export default EducationForm;
