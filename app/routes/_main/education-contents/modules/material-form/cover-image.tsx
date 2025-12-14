import { Controller, useFormContext } from 'react-hook-form';

import FileUploadField from '@app/components/form-fields/file-upload-field';
import useFileUpload from '@app/hooks/use-file-upload';

import type { MaterialFormInputs } from './index';

function CoverImage() {
  const { control, setValue, trigger } = useFormContext<MaterialFormInputs>();

  const { handleUpload, uploadState, resetUploadState } = useFileUpload({
    uploadType: 'images',
    onComplete: completed => {
      setValue('cover_image', completed.response);
      trigger('cover_image');
    },
  });

  return (
    <Controller
      control={control}
      name="cover_image"
      rules={{ required: 'Kapak resmi alanı zorunludur' }}
      render={({ fieldState }) => (
        <FileUploadField
          label="Kapak Resmi:"
          inputId="cover_image"
          error={fieldState.error?.message}
          uploadProviderProps={{
            onChange: handleUpload,
            accept: 'image/*',
            sizeLimit: 5,
          }}
          uploadingProgress={uploadState}
          onReset={resetUploadState}
        />
      )}
    />
  );
}

export default CoverImage;
