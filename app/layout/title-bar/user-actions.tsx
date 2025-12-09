import { Link } from '@tanstack/react-router';

import Avatar from '@app/components/ui/avatar';
import Button from '@app/components/ui/button';
import Dropdown from '@app/components/ui/dropdown';
import Icon from '@app/components/ui/icon';
import type { IconListProps } from '@app/components/ui/icon/icon-list';
import useCurrentUserQuery from '@app/services/use-current-user-query';

interface DropdownItem {
  dropdownItemId: string;
  label: string;
  icon: IconListProps;
  route: string;
}

const dropdownItems: DropdownItem[] = [
  {
    dropdownItemId: 'profile',
    label: 'Profilim',
    icon: 'user',
    route: '/profile',
  },
  {
    dropdownItemId: 'logout',
    label: 'Çıkış Yap',
    icon: 'logout',
    route: '/logout',
  },
];

function UserActions() {
  const { data, isLoading } = useCurrentUserQuery();

  if (isLoading) {
    return <div className="skeleton size-6 rounded-sm" />;
  }

  if (!data) return null;

  return (
    <Dropdown>
      <Dropdown.Trigger asChild>
        <Button
          size="sm"
          variant="secondary"
          className="px-0.5!"
        >
          <Avatar
            name={data.name}
            avatarRootProps={{
              className: 'size-6 rounded-sm',
            }}
          />
          <Icon
            name="chevron-down"
            className="size-4"
          />
        </Button>
      </Dropdown.Trigger>
      <Dropdown.Content>
        {dropdownItems.map(item => (
          <Dropdown.Item
            key={item.dropdownItemId}
            asChild
          >
            <Link to={item.route}>
              <Icon name={item.icon} />
              {item.label}
            </Link>
          </Dropdown.Item>
        ))}
      </Dropdown.Content>
    </Dropdown>
  );
}

export default UserActions;
