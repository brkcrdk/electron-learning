import Input from '@/components/ui/Input';
export interface TableSearchProps {
  value: string;
  placeholder: string;
  onSearch: (newSearchValue: string) => void;
}

function TableSearchBar({ onSearch, value, placeholder }: TableSearchProps) {
  return (
    <Input
      rootProps={{
        className: 'flex-1',
      }}
      leftIconProps={{
        name: 'search',
        className: 'text-gray-600 size-4 p-0',
      }}
      inputProps={{
        className: 'bg-transparent',
        placeholder,
        defaultValue: value,
        onBlur: e => onSearch(e.currentTarget.value.trim()),
        onKeyDown: e => {
          if (e.key === 'Enter') {
            onSearch(e.currentTarget.value.trim());
          }
        },
      }}
    />
  );
}
export default TableSearchBar;
