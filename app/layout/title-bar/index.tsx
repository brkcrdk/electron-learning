import { useCanGoBack, useRouter } from '@tanstack/react-router';

import Button from '@app/components/ui/button';
import Icon from '@app/components/ui/icon';

import MyFavourites from './my-favourites';
import ThemeToggle from './theme-toggle';
import useCanGoForward from './use-can-go-forward';
import UserActions from './user-actions';

function TitleBar() {
  const canGoBack = useCanGoBack();
  const canGoForward = useCanGoForward();

  const { history } = useRouter();

  return (
    <div className="webkit-draggable bg-sidebar border-sidebar-border relative flex h-12 w-full items-center justify-between border px-4">
      <nav className="webkit-no-draggable flex items-center gap-2">
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="icon"
            disabled={!canGoBack}
            onClick={() => history.back()}
          >
            <Icon name="arrow-left" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            disabled={!canGoForward}
            onClick={() => history.forward()}
          >
            <Icon name="arrow-right" />
          </Button>
        </div>
      </nav>
      <div className="webkit-no-draggable flex items-center gap-2">
        <MyFavourites />
        <ThemeToggle />
        <UserActions />
      </div>
    </div>
  );
}

export default TitleBar;
