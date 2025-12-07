import Icon from '@app/components/ui/icon';

function Header() {
  return (
    <nav className="navbar bg-base-300 w-full">
      <label
        htmlFor="my-drawer-4"
        aria-label="open sidebar"
        className="btn btn-square btn-ghost"
      >
        <Icon name="sidebar-expand" />
      </label>
      <div className="px-4">Navbar Title</div>
    </nav>
  );
}

export default Header;
