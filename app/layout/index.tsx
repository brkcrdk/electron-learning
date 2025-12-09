import type { PropsWithChildren } from 'react';

import { Dialog } from 'radix-ui';

import Icon from '@app/components/ui/icon';

import Header from './header';
// import Sidebar from './sidebar';
import TitleBar from './title-bar';

function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <TitleBar />
      <Dialog.Root open={true}>
        <Dialog.Trigger>
          <Icon name="sidebar-expand" />
        </Dialog.Trigger>
        <Dialog.Content>
          <Dialog.Title>Sidebar</Dialog.Title>
          <Dialog.Description>Sidebar</Dialog.Description>
          {/* <Dialog.Footer>
            <Dialog.Close>Close</Dialog.Close>
          </Dialog.Footer> */}
        </Dialog.Content>
        asdsadasd
      </Dialog.Root>
      {/* <div className="drawer drawer-open">
        <input
          id="sidebar-drawer"
          type="checkbox"
          className="drawer-toggle"
        />
        <div className="drawer-content bg-base-300">
          <Header />
          <section className="p-4">{children}</section>
        </div>
        <Sidebar />
      </div> */}
    </>
  );
}

export default Layout;
