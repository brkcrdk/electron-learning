import ThemeToggle from './theme-toggle';
import Icon from '../../components/ui/icon';

function TitleBar() {
  return (
    <div className="bg-base-100 webkit-draggable relative flex h-12 w-full items-center justify-between px-4">
      <nav className="webkit-no-draggable flex items-center gap-2 pl-20">
        <div className="flex gap-1">
          <button className="btn btn-sm">
            <Icon name="arrow-left" />
          </button>
          <button className="btn btn-sm">
            <Icon name="arrow-right" />
          </button>
        </div>
      </nav>
      <div className="webkit-no-draggable flex items-center gap-2">
        <ThemeToggle />
        avatar area
      </div>
    </div>
  );
}

export default TitleBar;
