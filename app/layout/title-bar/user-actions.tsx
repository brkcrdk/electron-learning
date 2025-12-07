import { useQuery } from '@tanstack/react-query';

import Avatar from '../../components/ui/avatar';
import Dropdown from '../../components/ui/dropdown';
import Icon from '../../components/ui/icon';

function UserActions() {
  const { data, isLoading } = useQuery({
    queryKey: ['currentUser'],
    queryFn: () => window.electronAPI.getCurrentUser(),
  });

  if (isLoading) {
    return <div className="skeleton size-6 rounded-sm" />;
  }

  if (!data?.success) return null;

  return (
    <Dropdown
      triggerProps={{
        className: 'px-1',
        children: (
          <>
            <Avatar
              name={data.data.name}
              avatarRootProps={{
                className: 'size-6 rounded-sm',
              }}
            />
            <Icon
              name="chevron-down"
              className="size-4"
            />
          </>
        ),
      }}
      dropdownItems={[
        {
          itemType: 'default',
          dropdownItemId: 'default-1',
          itemProps: {
            children: 'Profilim',
            icon: {
              name: 'user',
            },
          },
        },
        {
          itemType: 'link',
          dropdownItemId: 'link-1',
          itemProps: {
            to: '/logout',
            children: 'Logout',
            icon: {
              name: 'logout',
            },
          },
        },
      ]}
    />
  );
}

export default UserActions;
