import Dropdown from '../../components/ui/dropdown';
import Icon from '../../components/ui/icon';

function UserActions() {
  return (
    <Dropdown
      triggerProps={{
        className: 'px-1',
        children: (
          <>
            <div className="avatar">
              <div className="size-6 rounded-md">
                <img src="https://img.daisyui.com/images/profile/demo/batperson@192.webp" />
              </div>
            </div>
            <Icon
              name="chevron-down"
              className="size-4"
            />
          </>
        ),
      }}
      dropdownItems={[
        {
          itemType: 'link',
          dropdownItemId: 'link-1',
          itemProps: {
            to: '/logout',
            children: 'Logout',
            icon: {
              name: 'shield-check',
            },
          },
        },
        {
          itemType: 'default',
          dropdownItemId: 'default-1',
          itemProps: {
            children: 'default xx',
            isLoading: true,
          },
        },
      ]}
    />
  );
}

export default UserActions;
