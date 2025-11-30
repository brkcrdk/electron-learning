import { Dialog } from 'radix-ui';

import Icon from '../icon';

export type ModalHeaderProps =
  | {
      /**
       * Modal headerını render etmek istemediğimiz zaman bu durumu bu prop ile yönetebiliriz.
       * @defaultValue `true`
       */
      hideHeader: true;
    }
  | {
      /**
       * Modal headerını render etmek istemediğimiz zaman bu durumu bu prop ile yönetebiliriz.
       * @defaultValue `true`
       */
      hideHeader: false;
      title: string;
      /**
       * Modalın sağ üstünde bulunan kapatma iconunu render edip etmeyeceğimizi belirten proptur
       * @defaultValue `false`
       */
      hasCloseIcon?: boolean;
    };

function ModalHeader(props: ModalHeaderProps) {
  /**
   * NOTE: Bu kontrol aynı zamanda `Modal` rootunda da yapılıyor, burada yapma nedenimiz typescriptin typlerı doğru alabilmesi içindir
   * */
  if (props.hideHeader) return null;

  const { title, hasCloseIcon } = props;

  return (
    <header className="flex w-full items-center justify-between">
      <Dialog.Title className="text-lg font-medium">{title}</Dialog.Title>
      <Dialog.Description className="sr-only">{title}</Dialog.Description>
      {hasCloseIcon && (
        <Dialog.Close className="btn btn-xs btn-square cursor-pointer">
          <Icon
            name="close"
            className="size-4"
          />
        </Dialog.Close>
      )}
    </header>
  );
}
export default ModalHeader;
