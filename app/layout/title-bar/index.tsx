import { useCanGoBack, useRouter } from '@tanstack/react-router';

import Icon from '@app/components/ui/icon';

// import ThemeToggle from './theme-toggle';
// import UserActions from './user-actions';

function TitleBar() {
  const canGoBack = useCanGoBack();
  const { history } = useRouter();

  return (
    <div className="webkit-draggable z-999 bg-sidebar border-sidebar-border h-(--title-bar-height) relative flex w-full items-center justify-between border px-4">
      {/* <nav className="webkit-no-draggable flex items-center gap-2 pl-20">
        <div className="flex gap-1">
          <button
            className="btn btn-sm"
            disabled={!canGoBack}
            onClick={() => history.back()}
          >
            <Icon name="arrow-left" />
          </button>
          <button
            className="btn btn-sm"
            onClick={() => history.forward()}
          >
            <Icon name="arrow-right" />
          </button>
        </div>
      </nav>
      <div className="webkit-no-draggable flex items-center gap-2">
        <ThemeToggle />
        <UserActions />
      </div> */}
    </div>
  );
}

export default TitleBar;
