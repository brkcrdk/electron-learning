import type { RowSelectionState } from '@tanstack/react-table';
import { useFormContext } from 'react-hook-form';

import Field from '@app/components/ui/field';
import Select from '@app/components/ui/select';
import type { EducationListItem } from '@db/schema';

import EducationSelector from './education-selector';
import ExampleFile from './example-file';

export interface AssigmentFormProps {
  selectedUsers: RowSelectionState;
  selectedEducation: EducationListItem | null;
}

function AssigmentForm() {
  const { control } = useFormContext<AssigmentFormProps>();

  return (
    <Field.Group>
      <ExampleFile />
      <EducationSelector />
    </Field.Group>
  );
}

export default AssigmentForm;
