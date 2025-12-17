import Button from '@app/components/ui/button';
import Drawer from '@app/components/ui/drawer';
import Icon from '@app/components/ui/icon';
import type { EducationAssignmentListItem } from '@db/schema';

import DeleteAssignment from './delete-assignment';
import EditAssignment from './edit-assignment';

interface Props {
  assignment: EducationAssignmentListItem;
}

function AssignmentActions({ assignment }: Props) {
  return (
    <Drawer>
      <Drawer.Trigger size="icon-sm">
        <Icon
          name="pencil"
          className="size-4"
        />
      </Drawer.Trigger>
      <Drawer.Content>
        <Drawer.Header>
          <Drawer.Title>Eğitim Ataması Bilgilerini Düzenle</Drawer.Title>
          <Drawer.Description>Eğitim ataması bilgilerini düzenlemek için lütfen bilgilerinizi giriniz.</Drawer.Description>
        </Drawer.Header>
        <EditAssignment assignment={assignment} />
        <Drawer.Footer className="grid grid-cols-2 gap-2">
          <DeleteAssignment assignmentId={assignment.id} />
          <Button
            form="edit-assignment-form"
            type="submit"
          >
            Eğitim Atamasını Düzenle
          </Button>
        </Drawer.Footer>
      </Drawer.Content>
    </Drawer>
  );
}

export default AssignmentActions;
