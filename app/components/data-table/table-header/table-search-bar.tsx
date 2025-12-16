import { useState } from 'react';

import { useDebounceCallback } from 'usehooks-ts';

import Input from '@app/components/ui/input';
export interface TableSearchProps {
  value: string;
  placeholder: string;
  onSearch: (newSearchValue: string) => void;
}

function TableSearchBar({ value, placeholder, onSearch }: TableSearchProps) {
  const [searchValue, setSearchValue] = useState(value);

  const debounced = useDebounceCallback(onSearch, 500);

  return (
    <Input
      className="max-w-sm"
      placeholder={placeholder}
      defaultValue={searchValue}
      onChange={e => {
        setSearchValue(e.target.value);
        debounced(e.target.value);
      }}
    />
  );
}
export default TableSearchBar;
