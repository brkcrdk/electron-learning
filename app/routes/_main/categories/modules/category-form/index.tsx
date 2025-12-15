import { Controller, useFormContext } from 'react-hook-form';

import InputField from '@app/components/form-fields/input-field';
import TextareaField from '@app/components/form-fields/textarea-field';
import Field from '@app/components/ui/field';
import TreeView from '@app/components/ui/tree-view';
import type { Category } from '@db/schema';

import ParentCategorySelector from './parent-category-selector';

export interface CategoryFormInputs {
  name: string;
  description: string;
  parentId: Category | null;
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
      <ParentCategorySelector />
      <TreeView />
    </Field.Group>
  );
}

export default CategoryForm;
