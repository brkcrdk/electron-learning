import { Controller, useFormContext } from 'react-hook-form';

import FileUploadField from '@app/components/form-fields/file-upload-field';
import useFileUpload from '@app/hooks/use-file-upload';

import type { MaterialFormInputs } from '.';

function ContentUploader() {
  const { control, setValue, trigger } = useFormContext<MaterialFormInputs>();

  const { handleUpload, uploadState, resetUploadState } = useFileUpload({
    uploadType: 'video',
    onComplete: completed => {
      setValue('media', completed.response);
      trigger('media');
    },
  });

  return (
    <Controller
      control={control}
      name="media"
      rules={{ required: 'İçerik dosyası alanı zorunludur' }}
      render={({ fieldState }) => (
        <FileUploadField
          label="İçerik Dosyası:"
          inputId="media"
          error={fieldState.error?.message}
          uploadingProgress={uploadState}
          uploadProviderProps={{
            onChange: handleUpload,
            accept: 'video/*',
            sizeLimit: 100,
          }}
          onReset={resetUploadState}
        />
      )}
    />
  );
}

export default ContentUploader;
