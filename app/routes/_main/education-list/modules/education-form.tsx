import { useQuery } from '@tanstack/react-query';
import { Controller, useFormContext, useWatch } from 'react-hook-form';

import type { FileUploadResponse } from '@api/upload-file-api/types';
import FileUploadField from '@app/components/form-fields/file-upload-field';
import InputField from '@app/components/form-fields/input-field';
import TextareaField from '@app/components/form-fields/textarea-field';
import Field from '@app/components/ui/field';
import Select from '@app/components/ui/select';
import useFileUpload from '@app/hooks/use-file-upload';
import getContentPath from '@app/utils/get-content-path';
import type { Category, EducationMaterialsListItem, EducationListItem } from '@db/schema';

type SelectOption<TValue> = { label: string; value: TValue };

export interface EducationFormInputs {
  name: string;
  description: string;
  category: SelectOption<Category['id']> | null;
  educationMaterial: SelectOption<EducationMaterialsListItem['id']> | null;
  coverImage: FileUploadResponse | null;
}

function EducationForm({ education }: { education?: EducationListItem }) {
  const { control, setValue, trigger } = useFormContext<EducationFormInputs>();

  const coverImage = useWatch({ control, name: 'coverImage' });

  const { data: categoriesData, isLoading: isCategoryLoading } = useQuery({
    queryKey: ['category-list'],
    queryFn: async () => {
      const response = await window.electronAPI.getCategoryList();
      if (!response.success) {
        throw response.error;
      }
      return response.data;
    },
  });

  const { data: materialData, isLoading: isMaterialLoading } = useQuery({
    queryKey: ['education-materials'],
    queryFn: async () => {
      const response = await window.electronAPI.getEducationMaterialList();
      if (!response.success) {
        throw response.error;
      }
      return response.data;
    },
  });

  const categoryOptions: SelectOption<Category['id']>[] = categoriesData?.map(item => ({ label: item.name, value: item.id })) || [];
  const materialOptions: SelectOption<EducationMaterialsListItem['id']>[] = materialData?.map(item => ({ label: item.name, value: item.id })) || [];

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

      <Controller
        control={control}
        name="category"
        rules={{ required: 'Kategori seçimi zorunludur' }}
        render={({ field, fieldState }) => (
          <Select
            label="Kategori:"
            placeholder="Kategori Seçin"
            isLoading={isCategoryLoading}
            options={categoryOptions}
            getOptionLabel={val => val.label}
            getOptionValue={val => `${val.value}`}
            errorMessage={fieldState.error?.message}
            {...field}
          />
        )}
      />

      <Controller
        control={control}
        name="educationMaterial"
        rules={{ required: 'Eğitim içeriği seçimi zorunludur' }}
        render={({ field, fieldState }) => (
          <Select
            label="Eğitim İçeriği:"
            placeholder="Eğitim İçeriği Seçin"
            isLoading={isMaterialLoading}
            options={materialOptions}
            getOptionLabel={val => val.label}
            getOptionValue={val => `${val.value}`}
            errorMessage={fieldState.error?.message}
            {...field}
          />
        )}
      />

      <Controller
        control={control}
        name="coverImage"
        rules={{ required: 'Kapak görseli zorunludur' }}
        render={({ fieldState }) => (
          <FileUploadField
            label="Kapak Görseli:"
            inputId="coverImage"
            error={fieldState.error?.message}
            uploadingProgress={uploadState}
            uploadProviderProps={{
              onChange: handleUpload,
              accept: 'image/jpeg, image/png, image/gif, image/webp',
              sizeLimit: 10,
            }}
            onReset={existingId => {
              resetUploadState(existingId);
              setValue('coverImage', null);
            }}
          />
        )}
      />

      {education && coverImage === null && education.coverImage && (
        <p className="text-muted-foreground text-sm">Mevcut kapak: {getContentPath(education.coverImage.filePath)}</p>
      )}
    </Field.Group>
  );
}

export default EducationForm;
