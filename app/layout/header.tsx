import { Link } from '@tanstack/react-router';

import Breadcrumb from '@app/components/ui/breadcrumb';
import Separator from '@app/components/ui/separator';
import Sidebar from '@app/components/ui/sidebar';

function Header() {
  return (
    <header className="flex shrink-0 items-center gap-2 py-2">
      <div className="flex items-center gap-2">
        <Sidebar.Trigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
        />
        <Breadcrumb>
          <Breadcrumb.List>
            <Breadcrumb.Item>
              <Breadcrumb.Link asChild>
                <Link to="/">Acme Inc</Link>
              </Breadcrumb.Link>
            </Breadcrumb.Item>
            <Breadcrumb.Separator />
            <Breadcrumb.Item>
              <Breadcrumb.Page>Data Fetching</Breadcrumb.Page>
            </Breadcrumb.Item>
          </Breadcrumb.List>
        </Breadcrumb>
      </div>
    </header>
  );
}

export default Header;
