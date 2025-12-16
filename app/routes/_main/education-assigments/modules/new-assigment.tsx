import Button from '@app/components/ui/button';
import Drawer from '@app/components/ui/drawer';

import UserList from './user-list';

function NewAssigment() {
  return (
    <Drawer>
      <Drawer.Trigger>Eğitim Ataması Yap</Drawer.Trigger>
      <Drawer.Content className="min-w-160">
        <Drawer.Header>
          <Drawer.Title>Yeni Eğitim Ataması Yap</Drawer.Title>
          <Drawer.Description>Yeni bir eğitim ataması yapılacak kişileri seçiniz..</Drawer.Description>
        </Drawer.Header>
        <UserList />
        <Drawer.Footer>
          <Button>Eğitim Ataması Yap</Button>
        </Drawer.Footer>
      </Drawer.Content>
    </Drawer>
  );
}

export default NewAssigment;
