import { Controller, useFormContext, useWatch } from 'react-hook-form';

import type { FileUploadResponse } from '@api/upload-file-api/types';
import FileUploadField from '@app/components/form-fields/file-upload-field';
import InputField from '@app/components/form-fields/input-field';
import TextareaField from '@app/components/form-fields/textarea-field';
import Field from '@app/components/ui/field';
import Select from '@app/components/ui/select';
import useFileUpload from '@app/hooks/use-file-upload';
import type { MediaFileTypes } from '@db/schema';

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

export interface ContentFormInputs {
  name: string;
  description: string;
  cover_image: FileUploadResponse | null;
  media: FileUploadResponse | null;
  media_type: MediaContentOption;
}

const allowedMediaMimeTypes: Record<MediaFileTypes, string> = {
  video: 'video/mp4, video/mov, video/avi, video/wmv, video/flv, video/mkv',
  stories: 'application/zip, application/x-zip-compressed',
  pdfs: 'application/pdf',
  images: 'image/jpeg, image/png, image/gif, image/webp',
};

function ContentForm() {
  const { control, setValue, trigger } = useFormContext<ContentFormInputs>();

  const media_type = useWatch({
    control,
    name: 'media_type',
  });

  const media = useWatch({
    control,
    name: 'media',
  });

  const { handleUpload, uploadState, resetUploadState } = useFileUpload({
    uploadType: media_type.value,
    onComplete: completed => {
      setValue('media', completed.response);
      trigger('media');
    },
    defaultUploadState: media
      ? {
          status: 'completed',
          progress: 100,
          file: new File([], media.fileName),
          progressId: crypto.randomUUID(),
          response: media,
        }
      : undefined,
  });

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
            onChange={value => {
              field.onChange(value);
              setValue('media', null);
              if (media) {
                resetUploadState(media.id);
              }
            }}
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
              accept: allowedMediaMimeTypes[media_type.value],
              sizeLimit: 100,
            }}
            onReset={resetUploadState}
          />
        )}
      />
    </Field.Group>
  );
}

export default ContentForm;
