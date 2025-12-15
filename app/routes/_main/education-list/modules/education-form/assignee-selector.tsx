import { useQuery } from '@tanstack/react-query';
import { Controller, useFormContext } from 'react-hook-form';

import Select from '@app/components/ui/select';

import type { EducationFormInputs } from '.';

function AssigneeSelector() {
  const { data, isLoading } = useQuery({
    queryKey: ['user-list'],
    queryFn: async () => {
      const response = await window.electronAPI.getUserList();
      if (!response.success) {
        throw response.error;
      }
      return response.data;
    },
    select: data => data.map(item => ({ label: item.name, value: item.id })),
  });

  const { control } = useFormContext<EducationFormInputs>();
  return (
    <Controller
      control={control}
      name="assigneeIds"
      rules={{ required: 'Eğitim atanacak kullanıcı seçimi zorunludur' }}
      render={({ field, fieldState }) => (
        <Select
          label="Eğitim Atanacak Kullanıcılar:"
          placeholder="Eğitim Atanacak Kullanıcı Seçin"
          isLoading={isLoading}
          options={data}
          errorMessage={fieldState.error?.message}
          isMulti
          {...field}
        />
      )}
    />
  );
}

export default AssigneeSelector;
