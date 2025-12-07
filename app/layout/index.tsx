import type { PropsWithChildren } from 'react';

import Header from './header';
import Sidebar from './sidebar';
import TitleBar from './title-bar';

function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <TitleBar />
      <div className="drawer drawer-open">
        <input
          id="my-drawer-4"
          type="checkbox"
          className="drawer-toggle"
        />
        <div className="drawer-content bg-base-300">
          <Header />
          <section className="p-4">{children}</section>
        </div>
        <Sidebar />
      </div>
    </>
  );
}

export default Layout;
