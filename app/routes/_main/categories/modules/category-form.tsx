import { Controller, useFormContext } from 'react-hook-form';

import InputField from '@app/components/form-fields/input-field';
import TextareaField from '@app/components/form-fields/textarea-field';
import Field from '@app/components/ui/field';

export interface CategoryFormInputs {
  name: string;
  description: string;
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
        rules={{ required: 'Kategori açıklaması alanı zorunludur' }}
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
    </Field.Group>
  );
}

export default CategoryForm;
