import { useQuery } from '@tanstack/react-query';
import { Controller, useFormContext } from 'react-hook-form';

import Select from '@app/components/ui/select';

import type { EducationFormInputs } from '.';

function MaterialSelector() {
  const { control } = useFormContext<EducationFormInputs>();

  const { data: materialData, isLoading } = useQuery({
    queryKey: ['education-materials'],
    queryFn: async () => {
      const response = await window.electronAPI.getEducationMaterialList();
      if (!response.success) {
        throw response.error;
      }
      return response.data;
    },
  });

  return (
    <Controller
      control={control}
      name="educationMaterial"
      rules={{ required: 'Eğitim içeriği seçimi zorunludur' }}
      render={({ field, fieldState }) => (
        <Select
          label="Eğitim İçeriği:"
          placeholder="Eğitim İçeriği Seçin"
          isLoading={isLoading}
          options={materialData}
          errorMessage={fieldState.error?.message}
          getOptionLabel={option => option.name}
          getOptionValue={option => String(option.id)}
          {...field}
        />
      )}
    />
  );
}

export default MaterialSelector;
