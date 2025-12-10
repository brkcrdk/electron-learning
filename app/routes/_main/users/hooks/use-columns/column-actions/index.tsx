import Button from '@app/components/ui/button';
import Dropdown from '@app/components/ui/dropdown';
import Icon from '@app/components/ui/icon';

import EditUser from '../../../modules/edit-user';
function ColumnActions() {
  return (
    <Dropdown>
      <Dropdown.Trigger asChild>
        <Button
          variant="ghost"
          size="icon"
        >
          <Icon name="more-horizontal" />
        </Button>
      </Dropdown.Trigger>
      <Dropdown.Content>
        <EditUser />
      </Dropdown.Content>
    </Dropdown>
  );
}

export default ColumnActions;
