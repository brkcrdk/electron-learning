import { useQuery } from '@tanstack/react-query';

import type { Category } from '@db/schema';

import SelectTreeField from './form-fields/select-tree-field';
import type { TreeItem } from './ui/tree-view';

interface Props {
  selectedValue: Category | null;
  error?: string;
  onSelect: (value: TreeItem) => void;
}

function CategoryTreeSelect({ selectedValue, error, onSelect }: Props) {
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
    <SelectTreeField
      label="Üst Kategori"
      inputId="categoryParent"
      error={error}
      treeData={data ? data : []}
      selectedValue={selectedValue ? { id: selectedValue.id, name: selectedValue.name } : null}
      onSelect={value => {
        onSelect(value);
      }}
    />
  );
}

export default CategoryTreeSelect;
