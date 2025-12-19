import Button from '@app/components/ui/button';
import Drawer from '@app/components/ui/drawer';
import Tabs from '@app/components/ui/tabs';
import cn from '@app/utils/cn';
import type { User } from '@db/schema';

import DeleteUser from './delete-user';
import EditUser from './edit-user';

interface Props {
  user: User;
}

function UserInformations({ user }: Props) {
  return (
    <Tabs.Content
      value="user-informations"
      className="relative flex size-full flex-col"
    >
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
    </Tabs.Content>
  );
}

export default UserInformations;
