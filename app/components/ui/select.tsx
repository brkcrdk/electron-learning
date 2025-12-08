import type { Ref } from 'react';

import ReactSelect from 'react-select';
import type { GroupBase, Props, SelectInstance } from 'react-select';

import cn from '@app/utils/cn';

export interface SelectProps<TOption, TIsMulti extends boolean = false, TGroup extends GroupBase<TOption> = GroupBase<TOption>>
  extends Props<TOption, TIsMulti, TGroup> {
  ref?: Ref<SelectInstance<TOption, TIsMulti, TGroup>>;
  label?: string;
  errorMessage?: string;
  wrapperClassName?: string;
}

function Select<TOption, TIsMulti extends boolean = false, TGroup extends GroupBase<TOption> = GroupBase<TOption>>({
  ref,
  label,
  errorMessage,
  placeholder = 'Seç..',
  wrapperClassName,
  ...props
}: SelectProps<TOption, TIsMulti, TGroup>) {
  return (
    <div className={cn('space-y-2', wrapperClassName)}>
      {label && <label className="label label-text font-medium">{label}</label>}

      <ReactSelect
        ref={ref}
        menuPlacement="auto"
        placeholder={placeholder}
        noOptionsMessage={() => 'Sonuç Bulunamadı'}
        loadingMessage={() => 'Yükleniyor...'}
        unstyled
        classNames={{
          control: state =>
            cn(
              'border-input w-full cursor-pointer! gap-1.5 rounded-sm border border-base-content/20 bg-transparent shadow-xs transition-[color,box-shadow] outline-none',
              'min-h-11 px-3 py-2',
              'bg-base-100',
              state.isFocused && 'border-primary ring-base-content ring-2',
              state.isDisabled && 'pointer-events-none cursor-not-allowed opacity-50',
              errorMessage && 'ring-error border-error'
            ),
          valueContainer: () => 'gap-1.5 py-0.5',
          placeholder: () => 'text-sm',
          input: () => 'text-sm cursor-pointer',
          singleValue: () => 'text-sm',
          multiValue: () => 'bg-primary/50 rounded-sm flex items-center gap-1 pl-2 pr-1 py-0.5',
          multiValueLabel: () => 'text-sm ',
          multiValueRemove: () => 'hover:bg-base-content/20 rounded transition-colors cursor-pointer p-0.5',
          menu: () => 'border-input mt-1.5 rounded-sm shadow-lg overflow-hidden p-1 text-sm bg-base-100',
          menuList: () => 'max-h-60 overflow-y-auto p-2',
          option: state =>
            cn(
              'cursor-pointer! rounded-sm px-3 py-2 transition-colors font-medium',
              state.isSelected ? 'bg-primary' : state.isFocused && 'bg-primary/50',
              state.isDisabled && 'cursor-not-allowed opacity-50'
            ),
          noOptionsMessage: () => 'text-base-content py-3 text-center',
          loadingMessage: () => 'text-base-content py-3 text-center',
          clearIndicator: () => cn('btn btn-xs btn-square', '[&>svg]:size-4'),
          dropdownIndicator: state => cn('btn btn-xs btn-square', '[&>svg]:size-4', state.selectProps.menuIsOpen && 'rotate-180'),
          ...props.classNames,
        }}
        {...props}
      />

      {errorMessage && <span className="label-text-alt text-error mt-1">{errorMessage}</span>}
    </div>
  );
}

export default Select;
