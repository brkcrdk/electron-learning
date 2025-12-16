import type { RowSelectionState } from '@tanstack/react-table';

import Field from '@app/components/ui/field';
import type { EducationListItem } from '@db/schema';

import EducationSelector from './education-selector';
import ExampleFile from './example-file';
import UserList from './user-list';

export interface AssigmentFormProps {
  selectedUsers: RowSelectionState;
  selectedEducation: EducationListItem | null;
}

function AssigmentForm() {
  return (
    <Field.Group>
      <ExampleFile />
      <EducationSelector />
      <UserList />
    </Field.Group>
  );
}

export default AssigmentForm;
