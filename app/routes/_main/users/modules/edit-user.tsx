import Drawer from '@app/components/ui/drawer';
import Icon from '@app/components/ui/icon';

function EditUser() {
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
          <Drawer.Title>Kullanıcı Düzenle</Drawer.Title>
        </Drawer.Header>
      </Drawer.Content>
    </Drawer>
  );
}

export default EditUser;
