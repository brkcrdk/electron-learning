import { useCanGoBack, useRouter } from '@tanstack/react-router';

import Button from '@app/components/ui/button';
import Icon from '@app/components/ui/icon';

import ThemeToggle from './theme-toggle';

function TitleBar() {
  const canGoBack = useCanGoBack();
  const { history } = useRouter();

  return (
    <div className="webkit-draggable z-999 bg-sidebar border-sidebar-border relative flex h-12 w-full items-center justify-between border px-4">
      <nav className="webkit-no-draggable flex items-center gap-2 pl-20">
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
          >
            <Icon name="arrow-right" />
          </Button>
        </div>
      </nav>
      <div className="webkit-no-draggable flex items-center gap-2">
        <ThemeToggle />
        {/* <UserActions /> */}
      </div>
    </div>
  );
}

export default TitleBar;
