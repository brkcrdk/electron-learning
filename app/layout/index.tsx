import type { CSSProperties, PropsWithChildren } from 'react';

import Sidebar from './sidebar';
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
        <Sidebar
          variant="inset"
          className="h-(--available-height) mt-12"
        >
          Sidebar
        </Sidebar>
        <Sidebar.Inset className="h-(--available-height)">Content</Sidebar.Inset>
      </Sidebar.Provider>
    </div>
  );
}

export default Layout;
