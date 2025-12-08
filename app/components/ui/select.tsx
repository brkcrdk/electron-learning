// const ReactSelect = dynamic(() => import('react-select'), { ssr: false });
import type { HTMLAttributes } from 'react';

import ReactSelect, { type GroupBase, type Props as ReactSelectProps } from 'react-select';

interface Props<Option, IsMulti extends boolean, Group extends GroupBase<Option> = GroupBase<Option>> {
  rootProps?: HTMLAttributes<HTMLDivElement>;
  error?: string;
  errorIndicatorProps?: HTMLAttributes<HTMLSpanElement>;
  selectProps?: ReactSelectProps<Option, IsMulti, Group>;
}

function Select<Option, IsMulti extends boolean, Group extends GroupBase<Option> = GroupBase<Option>>(props: Props<Option, IsMulti, Group>) {
  const { selectProps, error } = props;
  return (
    <div className="group w-full space-y-2">
      {selectProps?.['aria-label'] && (
        <label
          className="label label-text font-medium"
          htmlFor={selectProps.id}
        >
          {selectProps['aria-label']}
        </label>
      )}
      <ReactSelect
        placeholder="Placeholder gir"
        noOptionsMessage={() => 'Sonuç bulunamadı'}
        loadingMessage={() => 'Yükleniyor...'}
        openMenuOnFocus
        openMenuOnClick
      />
      {error && <span className="label-text-alt text-error mt-1">{error}</span>}
    </div>
  );
}

export default Select;
