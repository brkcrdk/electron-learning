import { Controller, useFormContext } from 'react-hook-form';

import CategoryTreeSelect from '@app/components/form-fields/category-select-field';

import type { EducationFormInputs } from '../education-form';

function CategorySelector() {
  const { control } = useFormContext<EducationFormInputs>();

  return (
    <Controller
      control={control}
      name="category"
      rules={{ required: 'Kategori seçimi zorunludur' }}
      render={({ field, fieldState }) => (
        <CategoryTreeSelect
          selectedValue={field.value}
          error={fieldState.error?.message}
          label="Kategori"
          inputId="category"
          onSelect={value => {
            field.onChange(value);
          }}
        />
      )}
    />
  );
}

export default CategorySelector;
