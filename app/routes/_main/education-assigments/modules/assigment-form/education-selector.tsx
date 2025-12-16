import { useQuery } from '@tanstack/react-query';
import { Controller, useFormContext } from 'react-hook-form';

import Select from '@app/components/ui/select';

import type { AssigmentFormProps } from '.';

function EducationSelector() {
  const { control } = useFormContext<AssigmentFormProps>();

  const { data } = useQuery({
    queryKey: ['education-list'],
    queryFn: async () => {
      const response = await window.electronAPI.getEducationList();
      if (!response.success) {
        throw response.error;
      }
      return response.data;
    },
  });

  return (
    <Controller
      control={control}
      name="selectedEducation"
      rules={{ required: 'Eğitim seçimi zorunludur' }}
      render={({ field, fieldState }) => (
        <Select
          label="Eğitim"
          options={data}
          getOptionLabel={option => option.name}
          getOptionValue={option => String(option.id)}
          errorMessage={fieldState.error?.message}
          {...field}
          placeholder="Eğitim Seçin"
        />
      )}
    />
  );
}

export default EducationSelector;
