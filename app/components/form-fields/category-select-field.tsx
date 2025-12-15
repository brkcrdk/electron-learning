import type { ComponentProps } from 'react';

import { useQuery } from '@tanstack/react-query';

import type { Category } from '@db/schema';

import Field from '../ui/field';
import SelectTree from '../ui/select-tree';

type SelectTreeProps = Omit<ComponentProps<typeof SelectTree>, 'treeData'>;

interface Props extends SelectTreeProps {
  error?: string;
  label?: string;
  inputId: string;
  selectedValue: Category | null;
}

function CategoryTreeSelect({ error, label, inputId, ...props }: Props) {
  const { data } = useQuery({
    queryKey: ['query-list-category-detail'],
    queryFn: async () => {
      const response = await window.electronAPI.getCategoryList();
      if (!response.success) {
        throw response.error;
      }
      return response.data;
    },
  });

  return (
    <Field className="min-w-60">
      <Field.Label htmlFor={inputId}>{label}</Field.Label>
      <SelectTree
        {...props}
        treeData={data ? data : []}
        placeholder="Kategori seçiniz..."
        selectedValue={props.selectedValue ? { id: props.selectedValue.id, name: props.selectedValue.name } : null}
      />
      {error && <Field.Error>{error}</Field.Error>}
    </Field>
  );
}

export default CategoryTreeSelect;
