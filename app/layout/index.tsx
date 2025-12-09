import type { CSSProperties, PropsWithChildren } from 'react';

import Sidebar from '@app/components/ui/sidebar';

import Header from './header';
import LayoutSidebar from './layout-sidebar';
import TitleBar from './title-bar';

/**
 * Layout component
 * NOTE: Title bar yüksekliği spacing 12 olduğu için sidebar yüksekliği ve inset yüksekliği ona göre hesaplanır.
 */
function Layout({ children }: PropsWithChildren) {
  return (
    <div
      className="h-svh overflow-hidden"
      style={{ '--available-height': 'calc(100svh - var(--spacing(12)))' } as CSSProperties}
    >
      <TitleBar />
      <Sidebar.Provider>
        <LayoutSidebar />
        <Sidebar.Inset className="h-(--available-height)">
          <Header />
          <section className="flex flex-col gap-4 p-6">{children}</section>
        </Sidebar.Inset>
      </Sidebar.Provider>
    </div>
  );
}

export default Layout;
