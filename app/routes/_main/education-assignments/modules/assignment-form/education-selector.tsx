import { useQuery } from '@tanstack/react-query';
import { Controller, useFormContext } from 'react-hook-form';

import Select from '@app/components/ui/select';
import educationListQuery from '@app/services/education-list-query';

import type { AssignmentFormProps } from '.';

function EducationSelector() {
  const { control } = useFormContext<AssignmentFormProps>();

  const { data } = useQuery(educationListQuery);

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
