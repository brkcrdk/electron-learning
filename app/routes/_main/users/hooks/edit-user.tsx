import Drawer from '@app/components/ui/drawer';
import Icon from '@app/components/ui/icon';

function EditUser() {
  return (
    <Drawer
      drawerId="edit-user-drawer"
      triggerProps={{
        children: (
          <Icon
            name="pencil"
            className="size-4"
          />
        ),
        className: 'btn btn-square btn-sm',
      }}
    >
      <Drawer.Header title="Kullanıcı Düzenle" />
    </Drawer>
  );
}

export default EditUser;
