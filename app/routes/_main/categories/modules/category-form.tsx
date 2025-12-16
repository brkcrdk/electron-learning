import { Controller, useFormContext } from 'react-hook-form';

import CategoryTreeSelect from '@app/components/form-fields/category-select-field';
import InputField from '@app/components/form-fields/input-field';
import TextareaField from '@app/components/form-fields/textarea-field';
import Field from '@app/components/ui/field';
import type { Category } from '@db/schema';

export interface CategoryFormInputs {
  name: string;
  description: string;
  categoryParent: Category | null;
}

function CategoryForm() {
  const { control } = useFormContext<CategoryFormInputs>();

  return (
    <Field.Group>
      <Controller
        control={control}
        name="name"
        rules={{ required: 'Kategori adı alanı zorunludur' }}
        render={({ field, fieldState }) => (
          <InputField
            label="Kategori Adı"
            id="name"
            placeholder="Kategori Adı"
            error={fieldState.error?.message}
            {...field}
          />
        )}
      />
      <Controller
        control={control}
        name="description"
        render={({ field, fieldState }) => (
          <TextareaField
            label="Açıklama:"
            id="description"
            placeholder="Kategori hakkında kısa bir açıklama yazınız..."
            error={fieldState.error?.message}
            {...field}
          />
        )}
      />
      <Controller
        control={control}
        name="categoryParent"
        render={({ field, fieldState }) => (
          <CategoryTreeSelect
            selectedValue={field.value}
            error={fieldState.error?.message}
            label="Üst Kategori"
            inputId="categoryParent"
            onSelect={value => {
              field.onChange(value);
            }}
          />
        )}
      />
    </Field.Group>
  );
}

export default CategoryForm;
