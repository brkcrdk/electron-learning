import Drawer from '@app/components/ui/drawer';
import Icon from '@app/components/ui/icon';
import type { EducationAssignmentListItem } from '@db/schema';

import DeleteAssignment from './delete-assignment';

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
          <Drawer.Title>Kategori Bilgilerini Düzenle</Drawer.Title>
          <Drawer.Description>Kategori bilgilerini düzenlemek için lütfen bilgilerinizi giriniz.</Drawer.Description>
        </Drawer.Header>
        {/* <EditCategory category={category} /> */}
        <Drawer.Footer className="grid grid-cols-2 gap-2">
          <DeleteAssignment assignmentId={assignment.id} />
          {/* <DeleteCategory categoryId={category.id} />
          <Button
            form="edit-category-form"
            type="submit"
          >
            Kategoriyi Düzenle
          </Button> */}
        </Drawer.Footer>
      </Drawer.Content>
    </Drawer>
  );
}

export default AssignmentActions;
