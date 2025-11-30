import Dropdown from '../../components/ui/dropdown';

function UserActions() {
  return (
    <Dropdown
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
