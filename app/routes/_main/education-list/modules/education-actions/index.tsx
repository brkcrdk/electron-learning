import Drawer from '@app/components/ui/drawer';
import Icon from '@app/components/ui/icon';
import type { EducationListItem } from '@db/schema';

import ViewEducation from './view-education';

interface Props {
  education: EducationListItem;
}

function EducationActions({ education }: Props) {
  return (
    <Drawer>
      <Drawer.Trigger size="icon-sm">
        <Icon
          name="eye-open"
          className="size-4"
        />
      </Drawer.Trigger>
      <Drawer.Content>
        <Drawer.Header>
          <Drawer.Title>Eğitim Detayı</Drawer.Title>
          <Drawer.Description>Eğitimin temel bilgilerini görüntüleyin.</Drawer.Description>
        </Drawer.Header>
        <ViewEducation education={education} />
      </Drawer.Content>
    </Drawer>
  );
}

export default EducationActions;
