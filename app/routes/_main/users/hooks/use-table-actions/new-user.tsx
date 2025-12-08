import Drawer from '@app/components/ui/drawer';

function NewUser() {
  return (
    <Drawer triggerProps={{ children: 'Kullanıcı Ekle' }}>
      <Drawer.CloseBtn>Kapat</Drawer.CloseBtn>
    </Drawer>
  );
}

export default NewUser;
