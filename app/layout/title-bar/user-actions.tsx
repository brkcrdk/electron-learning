import Avatar from '../../components/ui/avatar';
import Dropdown from '../../components/ui/dropdown';
import Icon from '../../components/ui/icon';

function UserActions() {
  return (
    <Dropdown
      triggerProps={{
        className: 'px-1',
        children: (
          <>
            <Avatar
              name="John Doe"
              avatarRootProps={{
                className: 'size-6 rounded-sm',
              }}
              avatarImageProps={{
                src: 'https://imgx.daisyui.com/images/profile/demo/batperson@192.webp',
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
