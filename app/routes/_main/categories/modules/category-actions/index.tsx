import Button from '@app/components/ui/button';
import Drawer from '@app/components/ui/drawer';
import Icon from '@app/components/ui/icon';
import type { Category } from '@db/schema';

import DeleteCategory from './delete-category';
import EditCategory from './edit-category';

interface Props {
  category: Category;
}
function CategoryActions({ category }: Props) {
  return (
    <Drawer>
      <Drawer.Trigger size="icon-sm">
        <Icon
          name="pencil"
          className="size-4"
        />
      </Drawer.Trigger>
      <Drawer.Content>
        <Drawer.Header>
          <Drawer.Title>Kategori Bilgilerini Düzenle</Drawer.Title>
          <Drawer.Description>Kategori bilgilerini düzenlemek için lütfen bilgilerinizi giriniz.</Drawer.Description>
        </Drawer.Header>
        <EditCategory category={category} />
        <Drawer.Footer className="grid grid-cols-2 gap-2">
          <DeleteCategory categoryId={category.id} />
          <Button
            form="edit-category-form"
            type="submit"
          >
            Kategoriyi Düzenle
          </Button>
        </Drawer.Footer>
      </Drawer.Content>
    </Drawer>
  );
}

export default CategoryActions;
