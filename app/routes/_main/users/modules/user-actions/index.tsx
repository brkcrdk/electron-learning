import type { ComponentProps } from 'react';

import Drawer from '@app/components/ui/drawer';
import Tabs from '@app/components/ui/tabs';
import type { User } from '@db/schema';

import UserCard from './user-card';
import UserInformations from './user-informations';
import UsersFavouriteEducations from './users-favourite-educations';

interface Props {
  user: User;
  triggerProps: ComponentProps<typeof Drawer.Trigger>;
  initialAction: 'user-informations' | 'user-favorite-educations';
}

function UserActions({ user, triggerProps, initialAction }: Props) {
  return (
    <Drawer>
      <Drawer.Trigger {...triggerProps} />
      <Drawer.Content className="flex flex-col gap-4">
        <UserCard user={user} />
        <Tabs
          defaultValue={initialAction}
          className="size-full"
        >
          <Tabs.List>
            <Tabs.Trigger value="user-informations">Kullanıcı Bilgileri</Tabs.Trigger>
            <Tabs.Trigger value="user-favorite-educations">Favori Eğitimler</Tabs.Trigger>
          </Tabs.List>
          <UserInformations user={user} />
          <UsersFavouriteEducations />
        </Tabs>
      </Drawer.Content>
    </Drawer>
  );
}

export default UserActions;
