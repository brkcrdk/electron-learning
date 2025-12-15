import Button from '@app/components/ui/button';
import Drawer from '@app/components/ui/drawer';
import Icon from '@app/components/ui/icon';
import type { EducationListItem } from '@db/schema';

import DeleteEducation from './delete-education';
import EditEducation from './edit-education';

interface Props {
  education: EducationListItem;
}

function EducationActions({ education }: Props) {
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
          <Drawer.Title>Eğitim Bilgilerini Düzenle</Drawer.Title>
          <Drawer.Description>Eğitim bilgilerini düzenlemek için lütfen bilgileri giriniz.</Drawer.Description>
        </Drawer.Header>
        <EditEducation education={education} />
        <Drawer.Footer className="grid grid-cols-2 gap-2">
          <DeleteEducation educationId={education.id} />
          <Button
            form="edit-education-form"
            type="submit"
          >
            Eğitimi Güncelle
          </Button>
        </Drawer.Footer>
      </Drawer.Content>
    </Drawer>
  );
}

export default EducationActions;
