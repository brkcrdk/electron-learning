import Button from '@app/components/ui/button';
import Drawer from '@app/components/ui/drawer';
import Icon from '@app/components/ui/icon';
import EditCategory from '@app/routes/_main/categories/modules/category-actions/edit-category';
import type { Category, EducationListItem } from '@db/schema';

import EditContent from './edit-content';

interface Props {
  content: EducationListItem;
}
function ContentActions({ content }: Props) {
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
          <Drawer.Title>Eğitim İçeriği Bilgilerini Düzenle</Drawer.Title>
          <Drawer.Description>Eğitim içeriği bilgilerini düzenlemek için lütfen içerik bilgilerini giriniz.</Drawer.Description>
        </Drawer.Header>
        <EditContent content={content} />
        <Drawer.Footer className="grid grid-cols-2 gap-2">
          {/* <DeleteCategory categoryId={category.id} /> */}
          <Button
            form="edit-content-form"
            type="submit"
          >
            Kategoriyi Düzenle
          </Button>
        </Drawer.Footer>
      </Drawer.Content>
    </Drawer>
  );
}

export default ContentActions;
