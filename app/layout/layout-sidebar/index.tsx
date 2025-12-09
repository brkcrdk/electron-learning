import Sidebar from '@app/components/ui/sidebar';

import Content from './content';
import Header from './header';

function LayoutSidebar() {
  return (
    <Sidebar
      variant="inset"
      className="h-(--available-height) mt-12"
    >
      <Header />
      <Content />
    </Sidebar>
  );
}

export default LayoutSidebar;
