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
  errorMessage,
  placeholder = 'Seç..',
  ...props
}: SelectProps<TOption, TIsMulti, TGroup>) {
  return (
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
            'border-input w-full min-w-0 cursor-pointer! gap-1.5 rounded-md border bg-transparent shadow-xs transition-[color,box-shadow] outline-none',
            'min-h-11 px-3 py-2',
            state.isFocused && 'border-ring ring-ring/50 ring-2',
            state.isDisabled && 'pointer-events-none cursor-not-allowed opacity-50',
            errorMessage && 'ring-destructive/20 border-destructive'
          ),
        valueContainer: () => 'gap-1.5 py-0.5',
        placeholder: () => 'text-muted-foreground text-sm',
        input: () => 'text-foreground cursor-pointer text-sm',
        singleValue: () => 'text-foreground text-sm',
        multiValue: () => 'bg-muted rounded-sm flex items-center gap-1 pl-2 pr-1 py-0.5',
        multiValueLabel: () => 'text-foreground text-sm ',
        multiValueRemove: () => 'hover:bg-muted-foreground/20 rounded transition-colors cursor-pointer p-0.5',
        menu: () => 'bg-popover border-input mt-1.5 rounded-md border shadow-lg overflow-hidden p-1 text-sm',
        menuList: () => 'max-h-60 overflow-y-auto p-2',
        option: state =>
          cn(
            'cursor-pointer! rounded-md px-3 py-2 transition-colors',
            state.isSelected ? 'bg-muted font-medium' : state.isFocused ? 'bg-muted/50' : 'text-foreground',
            state.isDisabled && 'cursor-not-allowed opacity-50'
          ),

        noOptionsMessage: () => 'text-muted-foreground py-3 text-center',
        loadingMessage: () => 'text-muted-foreground py-3 text-center',
        clearIndicator: () => cn('text-muted-foreground hover:text-foreground cursor-pointer transition-colors', '[&>svg]:size-4'),
        dropdownIndicator: state => cn('text-muted-foreground transition-transform', '[&>svg]:size-4', state.selectProps.menuIsOpen && 'rotate-180'),
        ...props.classNames,
      }}
      {...props}
    />
  );
}

export default Select;
