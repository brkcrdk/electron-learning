import Button from '@app/components/ui/button';
import Icon from '@app/components/ui/icon';

function DeleteUser() {
  return (
    <Button
      variant="destructive"
      size="icon-sm"
    >
      <Icon
        name="trash"
        className="size-4"
      />
    </Button>
  );
}

export default DeleteUser;
