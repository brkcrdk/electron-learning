import RelativeDateCell from '@app/components/table-cells/relative-date-cell';
import Avatar from '@app/components/ui/avatar';
import Card from '@app/components/ui/card';
import Dialog from '@app/components/ui/dialog';
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
          avatarRootProps={{ className: 'size-16' }}
        />
        <div className="grid gap-0.5">
          <Dialog.Title className="text-md">{user.name}</Dialog.Title>
          <Dialog.Description className="text-sm">{user.username}</Dialog.Description>
          <Dialog.Description className="text-sm">
            Kayıt Tarihi: <RelativeDateCell date={user.createdAt} />
          </Dialog.Description>
        </div>
      </Card.Header>
    </Card>
  );
}

export default UserCard;
