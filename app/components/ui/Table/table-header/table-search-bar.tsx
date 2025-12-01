import Icon from '../../icon';

export interface TableSearchProps {
  value: string;
  placeholder: string;
  onSearch: (newSearchValue: string) => void;
}

function TableSearchBar({ value, placeholder, onSearch }: TableSearchProps) {
  return (
    <label className="input bg-base-200">
      <Icon
        name="search"
        className="opacity-50"
      />
      <input
        type="search"
        placeholder={placeholder}
        value={value}
        onChange={e => onSearch(e.target.value)}
      />
    </label>
  );
}
export default TableSearchBar;
