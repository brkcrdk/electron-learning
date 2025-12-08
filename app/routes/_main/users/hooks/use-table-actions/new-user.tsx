import Drawer from '@app/components/ui/drawer';
import Input from '@app/components/ui/input';

function NewUser() {
  return (
    <Drawer triggerProps={{ children: 'Kullanıcı Ekle' }}>
      <h2 className="text-lg font-medium">Yeni Kullanıcı Oluştur</h2>
      <form className="mt-6 grid gap-2">
        <Input label="Adı Soyadı" />
        <Input label="E-posta" />
        <Input label="Şifre" />
        <Input label="Rol" />
        <Input label="Aktiflik Durumu" />
      </form>
    </Drawer>
  );
}

export default NewUser;
