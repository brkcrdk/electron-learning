import Avatar from '@app/components/ui/avatar';
import Dropdown from '@app/components/ui/dropdown';
import Icon from '@app/components/ui/icon';
import useCurrentUserQuery from '@app/services/use-current-user-query';

function UserActions() {
  const { data, isLoading } = useCurrentUserQuery();

  if (isLoading) {
    return <div className="skeleton size-6 rounded-sm" />;
  }

  if (!data) return null;

  return (
    <Dropdown
      triggerProps={{
        className: 'px-1',
        children: (
          <>
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
            children: 'Çıkış Yap',
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
