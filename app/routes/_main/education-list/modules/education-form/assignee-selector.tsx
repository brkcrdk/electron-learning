import { useQuery } from '@tanstack/react-query';
import { Controller, useFormContext } from 'react-hook-form';

import Select from '@app/components/ui/select';
import userListQuery from '@app/services/user-list-query';

import type { EducationFormInputs } from '.';

function AssigneeSelector() {
  const { data, isLoading } = useQuery(userListQuery);

  const { control } = useFormContext<EducationFormInputs>();
  return (
    <Controller
      control={control}
      name="assignees"
      rules={{ required: 'Eğitim atanacak kullanıcı seçimi zorunludur' }}
      render={({ field, fieldState }) => (
        <Select
          label="Eğitim Atanacak Kullanıcılar:"
          placeholder="Eğitim Atanacak Kullanıcı Seçin"
          isLoading={isLoading}
          options={data}
          errorMessage={fieldState.error?.message}
          isMulti
          getOptionLabel={option => option.name}
          getOptionValue={option => String(option.id)}
          {...field}
        />
      )}
    />
  );
}

export default AssigneeSelector;
