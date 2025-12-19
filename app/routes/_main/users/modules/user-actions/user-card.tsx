import Avatar from '@app/components/ui/avatar';
import Card from '@app/components/ui/card';
import Dialog from '@app/components/ui/dialog';
import dayjs from '@app/utils/dayjs';
import type { User } from '@db/schema';
interface Props {
  user: User;
}

function UserCard({ user }: Props) {
  return (
    <Card>
      <Card.Header className="flex items-center gap-2">
        <Avatar
          name={user.name}
          avatarRootProps={{ className: 'size-12' }}
        />
        <div>
          <Dialog.Title>{user.name}</Dialog.Title>
          <Dialog.Description className="text-sm">{user.username}</Dialog.Description>
          <Dialog.Description className="text-sm">Kayıt Tarihi: {dayjs(user.createdAt).format('DD.MM.YYYY HH:mm')}</Dialog.Description>
        </div>
      </Card.Header>
    </Card>
  );
}

export default UserCard;
