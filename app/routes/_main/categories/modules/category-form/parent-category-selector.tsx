import { useQuery } from '@tanstack/react-query';
import { Controller, useFormContext } from 'react-hook-form';

import SelectTreeField from '@app/components/form-fields/select-tree-field';

import type { CategoryFormInputs } from '.';

function ParentCategorySelector() {
  const { data } = useQuery({
    queryKey: ['query-list-category-detail'],
    queryFn: async () => {
      const response = await window.electronAPI.getCategoryList();
      if (!response.success) {
        throw response.error;
      }
      return response.data;
    },
    select: data => data.map(item => ({ id: String(item.id), name: item.name })),
  });

  const { control } = useFormContext<CategoryFormInputs>();

  return (
    <Controller
      control={control}
      name="categoryParent"
      render={({ field, fieldState }) => (
        <SelectTreeField
          label="Üst Kategori"
          inputId="categoryParent"
          error={fieldState.error?.message}
          treeData={data ? data : []}
          selectedValue={field.value ? { id: String(field.value.id), name: field.value.name } : null}
          onSelect={value => {
            console.log(value);
          }}
        />
      )}
    />
  );
}

export default ParentCategorySelector;
