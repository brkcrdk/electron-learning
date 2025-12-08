import Drawer from '@app/components/ui/drawer';

function EditUser() {
  return (
    <Drawer
      drawerId="edit-user-drawer"
      triggerProps={{ children: 'Kullanıcı Düzenle' }}
    >
      <h2 className="text-lg font-medium">Kullanıcı Düzenle</h2>
    </Drawer>
  );
}

export default EditUser;
