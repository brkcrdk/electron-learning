import { useQuery } from '@tanstack/react-query';
import { Controller, useFormContext } from 'react-hook-form';

import Select from '@app/components/ui/select';
import educationMaterialsQuery from '@app/services/education-materials-query';

import type { EducationFormInputs } from '.';

function MaterialSelector() {
  const { control } = useFormContext<EducationFormInputs>();

  const { data: materialData, isLoading } = useQuery({
    ...educationMaterialsQuery,
    select: data => data.map(item => ({ label: item.name, value: item.id })),
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
          {...field}
        />
      )}
    />
  );
}

export default MaterialSelector;
