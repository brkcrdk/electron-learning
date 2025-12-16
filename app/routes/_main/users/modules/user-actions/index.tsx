import Button from '@app/components/ui/button';
import Drawer from '@app/components/ui/drawer';
import Icon from '@app/components/ui/icon';
import cn from '@app/utils/cn';
import type { User } from '@db/schema';

import DeleteUser from './delete-user';
import EditUser from './edit-user';

interface Props {
  user: User;
}

function UserActions({ user }: Props) {
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
          <Drawer.Title>Kullanıcı Bilgilerini Düzenle</Drawer.Title>
          <Drawer.Description>Kullanıcı bilgilerini düzenlemek için lütfen bilgilerinizi giriniz.</Drawer.Description>
        </Drawer.Header>
        <EditUser user={user} />
        <Drawer.Footer className={cn('grid grid-cols-2 gap-2', user.role === 'super-admin' && 'grid-cols-1')}>
          {user.role !== 'super-admin' && <DeleteUser userId={user.id} />}
          <Button
            form="edit-user-form"
            type="submit"
          >
            Kullanıcıyı Düzenle
          </Button>
        </Drawer.Footer>
      </Drawer.Content>
    </Drawer>
  );
}

export default UserActions;
