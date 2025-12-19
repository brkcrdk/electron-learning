import Drawer from '@app/components/ui/drawer';
import Icon from '@app/components/ui/icon';
import Tabs from '@app/components/ui/tabs';
import type { User } from '@db/schema';

import UserCard from './user-card';
import UserInformations from './user-informations';

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
        <Tabs
          defaultValue="user-informations"
          className="size-full"
        >
          <Tabs.List>
            <Tabs.Trigger value="user-informations">Kullanıcı Bilgileri</Tabs.Trigger>
            <Tabs.Trigger value="user-favorite-educations">Favori Eğitimler</Tabs.Trigger>
          </Tabs.List>
          <UserInformations user={user} />
          <Tabs.Content value="user-favorite-educations">content2</Tabs.Content>
        </Tabs>
      </Drawer.Content>
    </Drawer>
  );
}

export default UserActions;
