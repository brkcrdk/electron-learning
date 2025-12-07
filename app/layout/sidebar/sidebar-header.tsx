import Icon from '@app/components/ui/icon';

function SidebarHeader() {
  return (
    <div className="flex items-center gap-2 p-4">
      <div className="bg-primary rounded-full p-1">
        <Icon
          name="shield-check"
          className="text-primary-content size-5"
        />
      </div>

      <span className="is-drawer-close:hidden whitespace-nowrap font-medium">Test Projesi</span>
    </div>
  );
}

export default SidebarHeader;
