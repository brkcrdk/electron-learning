import { useQuery } from '@tanstack/react-query';
import { Controller, useFormContext } from 'react-hook-form';

import Select from '@app/components/ui/select';

import type { CategoryFormInputs } from '.';

function ParentCategorySelector() {
  const { control } = useFormContext<CategoryFormInputs>();

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
      name="parentId"
      render={({ field, fieldState }) => (
        <Select
          label="Üst Kategori:"
          options={categoryData}
          isLoading={isLoading}
          errorMessage={fieldState.error?.message}
          getOptionLabel={option => option.name}
          getOptionValue={option => String(option.id)}
          placeholder="Üst Kategori seçiniz..."
          {...field}
        />
      )}
    />
  );
}

export default ParentCategorySelector;
