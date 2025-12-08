import Drawer from '@app/components/ui/drawer';
import Input from '@app/components/ui/input';
import Select from '@app/components/ui/select';
import Switch from '@app/components/ui/switch';

function NewUser() {
  return (
    <Drawer
      drawerId="new-user-drawer"
      triggerProps={{ children: 'Kullanıcı Ekle' }}
    >
      <h2 className="text-lg font-medium">Yeni Kullanıcı Oluştur</h2>
      <form className="mt-6 grid gap-3">
        <Input label="Adı Soyadı" />
        <Input label="E-posta" />
        <Input label="Şifre" />
        <Input label="Rol" />
        <Input label="Aktiflik Durumu" />
        <Select label="Kullanıcı Rolü" />
        <Switch
          label="Aktiflik Durumu"
          id="status"
          defaultChecked
          rootProps={{ className: 'mt-4' }}
        />
      </form>
    </Drawer>
  );
}

export default NewUser;
