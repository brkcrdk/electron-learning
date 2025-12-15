import { Controller, useFormContext } from 'react-hook-form';

import CategoryTreeSelect from '@app/components/category-tree-select';

import type { CategoryFormInputs } from '.';

function ParentCategorySelector() {
  const { control } = useFormContext<CategoryFormInputs>();

  return (
    <Controller
      control={control}
      name="categoryParent"
      render={({ field, fieldState }) => (
        <CategoryTreeSelect
          selectedValue={field.value}
          error={fieldState.error?.message}
          onSelect={value => {
            field.onChange(value);
          }}
        />
      )}
    />
  );
}

export default ParentCategorySelector;
