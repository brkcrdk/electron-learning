import { Controller, useFormContext, useWatch } from 'react-hook-form';

import type { FileUploadResponse } from '@api/upload-file-api/types';
import FileUploadField from '@app/components/form-fields/file-upload-field';
import InputField from '@app/components/form-fields/input-field';
import TextareaField from '@app/components/form-fields/textarea-field';
import Field from '@app/components/ui/field';
import useFileUpload from '@app/hooks/use-file-upload';
import type { Category, User } from '@db/schema';

import AssigneeSelector from './assignee-selector';
import CategorySelector from './category-selector';
import MaterialSelector from './material-selector';

interface MaterialSelectOption {
  label: string;
  value: number;
}

export interface EducationFormInputs {
  name: string;
  description: string;
  category: Category | null;
  educationMaterial: MaterialSelectOption | null;
  coverImage: FileUploadResponse | null;
  assignees: User[] | null;
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
      <AssigneeSelector />
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
