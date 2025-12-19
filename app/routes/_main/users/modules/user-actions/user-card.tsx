import Avatar from '@app/components/ui/avatar';
import Card from '@app/components/ui/card';
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
          <Card.Title>{user.name}</Card.Title>
          <Card.Description className="capitalize">{user.role}</Card.Description>
        </div>
      </Card.Header>
    </Card>
  );
}

export default UserCard;
