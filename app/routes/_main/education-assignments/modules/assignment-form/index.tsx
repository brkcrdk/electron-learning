import type { RowSelectionState } from '@tanstack/react-table';
import { Controller, useFormContext } from 'react-hook-form';

import InputField from '@app/components/form-fields/input-field';
import TextareaField from '@app/components/form-fields/textarea-field';
import Field from '@app/components/ui/field';
import type { EducationListItem } from '@db/schema';

import EducationSelector from './education-selector';
import ExampleFile from './example-file';
import UserList from './user-list';

export interface AssignmentFormProps {
  title: string;
  description: string;
  selectedUsers: RowSelectionState;
  selectedEducation: EducationListItem | null;
}

function AssignmentForm() {
  const { control } = useFormContext<AssignmentFormProps>();
  return (
    <Field.Group>
      <ExampleFile />
      <Controller
        control={control}
        name="title"
        rules={{ required: 'Atama başlığı alanı zorunludur' }}
        render={({ field, fieldState }) => (
          <InputField
            label="Eğitim Ataması Başlığı"
            placeholder="Test eğitimi.."
            error={fieldState.error?.message}
            {...field}
          />
        )}
      />
      <Controller
        control={control}
        name="description"
        render={({ field }) => (
          <TextareaField
            label="Eğitim Ataması Açıklaması"
            placeholder="Test eğitimi hakkında kısa bir açıklama yazınız..."
            {...field}
          />
        )}
      />
      <EducationSelector />
      <UserList />
    </Field.Group>
  );
}

export default AssignmentForm;
