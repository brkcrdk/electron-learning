import { useQuery } from '@tanstack/react-query';
import { Controller, useFormContext } from 'react-hook-form';

import Select from '@app/components/ui/select';

import type { EducationFormInputs } from '../education-form';

function CategorySelector() {
  const { control } = useFormContext<EducationFormInputs>();

  const { data: categoryData, isLoading } = useQuery({
    queryKey: ['category-list'],
    queryFn: async () => {
      const response = await window.electronAPI.getCategoryList();
      if (!response.success) {
        throw response.error;
      }
      return response.data;
    },
  });

  return (
    <Controller
      control={control}
      name="category"
      rules={{ required: 'Kategori seçimi zorunludur' }}
      render={({ field, fieldState }) => (
        <Select
          label="Kategori:"
          placeholder="Kategori Seçin"
          isLoading={isLoading}
          options={categoryData}
          errorMessage={fieldState.error?.message}
          getOptionLabel={option => option.name}
          getOptionValue={option => String(option.id)}
          {...field}
        />
      )}
    />
  );
}

export default CategorySelector;
