import { Dialog } from 'radix-ui';

import Icon from '../icon';

interface Props {
  title: string;
  description?: string;
  /**
   * Drawer headerında kapatma iconunu render edip etmeyeceğimizi belirten proptur
   * @defaultValue `true`
   */
  hasCloseIcon?: boolean;
}

function DrawerHeader({ title, description, hasCloseIcon = true }: Props) {
  return (
    <header className="flex w-full flex-col gap-2">
      <Dialog.Title className="text-lg font-medium">{title}</Dialog.Title>
      {description ? (
        <Dialog.Description className="text-base-content/70 text-sm leading-relaxed">{description}</Dialog.Description>
      ) : (
        <Dialog.Description className="sr-only">Untitled Drawer</Dialog.Description>
      )}
      {hasCloseIcon && (
        <Dialog.Close className="btn btn-square btn-ghost absolute right-4 top-2">
          <Icon
            name="close"
            className="size-4"
          />
        </Dialog.Close>
      )}
    </header>
  );
}

export default DrawerHeader;
