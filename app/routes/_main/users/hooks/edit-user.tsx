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
      <h2 className="text-lg font-medium">Kullanıcı Düzenle</h2>
    </Drawer>
  );
}

export default EditUser;
