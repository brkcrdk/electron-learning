import Icon from '../icon';
import { useDrawerContext } from './drawer-context';

interface Props {
  title: string;
  /**
   * Drawer headerında kapatma iconunu render edip etmeyeceğimizi belirten proptur
   * @defaultValue `true`
   */
  hasCloseIcon?: boolean;
}

function DrawerHeader({ title, hasCloseIcon = true }: Props) {
  const { drawerId } = useDrawerContext();
  return (
    <header className="flex w-full items-center justify-between">
      <h2 className="text-lg font-medium">{title}</h2>
      {hasCloseIcon && (
        <label
          htmlFor={drawerId}
          aria-label="close drawer"
          className="btn btn-square btn-ghost absolute right-4 top-2"
        >
          <Icon
            name="close"
            className="size-4"
          />
        </label>
      )}
    </header>
  );
}

export default DrawerHeader;
