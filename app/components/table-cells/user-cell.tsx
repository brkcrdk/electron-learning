import type { User } from '@db/schema';

import Avatar from '../ui/avatar';

interface Props {
  user: User;
}
function UserCell({ user }: Props) {
  return (
    <div className="flex items-center justify-center gap-2">
      <Avatar
        name={user.name}
        avatarNameProps={{
          hideAvatarName: false,
          nameElementProps: {
            className: 'text-sm font-medium',
          },
        }}
      />
    </div>
  );
}

export default UserCell;
