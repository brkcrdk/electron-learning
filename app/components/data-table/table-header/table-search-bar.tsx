import Icon from '@app/components/ui/icon';
import Input from '@app/components/ui/input';

export interface TableSearchProps {
  value: string;
  placeholder: string;
  onSearch: (newSearchValue: string) => void;
}

function TableSearchBar({ value, placeholder, onSearch }: TableSearchProps) {
  return (
    <Input
      className="max-w-sm"
      placeholder={placeholder}
      value={value}
      onChange={e => onSearch(e.target.value)}
    />
  );
}
export default TableSearchBar;
