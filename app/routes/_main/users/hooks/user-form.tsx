import { Controller, useFormContext } from 'react-hook-form';

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

interface Props {
  onSubmit: (data: UserFormInputs) => void;
}

function UserForm({ onSubmit }: Props) {
  const { control, handleSubmit } = useFormContext<UserFormInputs>();

  return (
    <form
      className="mt-6 grid gap-3"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Controller
        control={control}
        name="name"
        rules={{ required: 'Adı Soyadı alanı zorunludur' }}
        render={({ field, fieldState }) => (
          <Input
            label="Adı Soyadı"
            error={fieldState.error?.message}
            {...field}
          />
        )}
      />
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
      <button
        type="submit"
        className="btn btn-primary"
      >
        Kaydet
      </button>
    </form>
  );
}

export default UserForm;
