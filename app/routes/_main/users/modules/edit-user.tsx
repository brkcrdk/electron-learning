import Dropdown from '@app/components/ui/dropdown';
import Icon from '@app/components/ui/icon';

function EditUser() {
  return (
    // <Drawer
    //   drawerId="edit-user-drawer"
    //   triggerProps={{
    //     children: (
    //       <Icon
    //         name="pencil"
    //         className="size-4"
    //       />
    //     ),
    //     className: 'btn btn-square btn-sm',
    //   }}
    // >
    //   <Drawer.Header title="Kullanıcı Düzenle" />
    // </Drawer>
    <Dropdown.Item>
      <Icon name="pencil" />
      Düzenle
    </Dropdown.Item>
  );
}

export default EditUser;
