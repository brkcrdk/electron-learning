import type { CSSProperties, PropsWithChildren } from 'react';

import Sidebar from './sidebar';
import TitleBar from './title-bar';

function Layout({ children }: PropsWithChildren) {
  return (
    <div
      className="contents"
      style={{ '--title-bar-height': '3rem' } as CSSProperties}
    >
      <TitleBar />
      <Sidebar.Provider>
        <Sidebar variant="inset">Sidebar</Sidebar>
        <Sidebar.Inset>Content</Sidebar.Inset>
      </Sidebar.Provider>
    </div>
  );
}

export default Layout;
