import Button from '@app/components/ui/button';
import Drawer from '@app/components/ui/drawer';
import Icon from '@app/components/ui/icon';
import Tabs from '@app/components/ui/tabs';
import cn from '@app/utils/cn';
import type { User } from '@db/schema';

import DeleteUser from './delete-user';
import EditUser from './edit-user';
import UserCard from './user-card';

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
      <Drawer.Content className="flex flex-col gap-4">
        <UserCard user={user} />
        <Tabs defaultValue="user-info">
          <Tabs.List>
            <Tabs.Trigger value="user-info">Kullanıcı Bilgileri</Tabs.Trigger>
            <Tabs.Trigger value="user-actions">Kullanıcı İşlemleri</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="user-info">content 1</Tabs.Content>
          <Tabs.Content value="user-actions">content2</Tabs.Content>
        </Tabs>
      </Drawer.Content>
    </Drawer>
  );
}

export default UserActions;
