import type { PropsWithChildren } from 'react';

import Sidebar from './sidebar';
import TitleBar from './title-bar';

/**
 * Layout component
 * NOTE: Title bar yüksekliği spacing 12 olduğu için sidebar yüksekliği ve inset yüksekliği ona göre hesaplanır.
 */
function Layout({ children }: PropsWithChildren) {
  return (
    <div className="h-svh overflow-hidden">
      <TitleBar />
      <Sidebar.Provider>
        <Sidebar
          variant="inset"
          className="h-[calc(100svh-var(--spacing(12))) mt-12"
        >
          Sidebar
        </Sidebar>
        <Sidebar.Inset className="h-[calc(100svh-var(--spacing(12)))]">Content</Sidebar.Inset>
      </Sidebar.Provider>
    </div>
  );
}

export default Layout;
