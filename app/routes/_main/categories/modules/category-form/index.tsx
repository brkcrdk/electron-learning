import { Controller, useFormContext } from 'react-hook-form';

import InputField from '@app/components/form-fields/input-field';
import SelectTreeField from '@app/components/form-fields/select-tree-field';
import TextareaField from '@app/components/form-fields/textarea-field';
import Field from '@app/components/ui/field';
import TreeView, { type TreeItem } from '@app/components/ui/tree-view';
import type { Category } from '@db/schema';

import ParentCategorySelector from './parent-category-selector';

export interface CategoryFormInputs {
  name: string;
  description: string;
  parentId: Category | null;
}

const treeData: TreeItem[] = [
  {
    id: '1',
    name: 'Item 1',
    children: [
      { id: '2', name: 'Item 1.1' },
      { id: '3', name: 'Item 1.2' },
    ],
  },
  {
    id: '4',
    name: 'Item 2',
    children: [
      { id: '5', name: 'Item 2.1' },
      {
        id: '6',
        name: 'Item 2.2',
        children: [
          { id: '7', name: 'Item 2.2.1' },
          { id: '8', name: 'Item 2.2.2' },
        ],
      },
    ],
  },
];

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

      <SelectTreeField
        label="Üst Kategori"
        inputId="parentId"
        treeData={treeData}
        selectedValue={{ id: '7', name: 'Item 2.2.1' }}
        // error={fieldState.error?.message}
        // {...field}
      />
    </Field.Group>
  );
}

export default CategoryForm;
