import { useFormContext } from 'react-hook-form';

import Input from '@app/components/ui/input';
import Select from '@app/components/ui/select';
import Switch from '@app/components/ui/switch';
import type { User } from '@db/schema';

export interface UserFormInputs {
  name: string;
  email: string;
  password: string;
  roles: User['roles'];
  isActive: boolean;
}

function UserForm() {
  const { control } = useFormContext<UserFormInputs>();

  return (
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
  );
}

export default UserForm;
