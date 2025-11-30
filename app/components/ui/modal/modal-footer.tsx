import { Link } from '@tanstack/react-router';
import { Dialog } from 'radix-ui';

import cn from '../../../utils/cn';

import type { ModalActionProps } from '.';
import type { ReactNode } from 'react';

type FooterContentType =
  | {
      /**
       * Bu footer tipinde `actions` arrayi return edilir.
       * Bu array içerisinde `ModalActionProps`larına ait objeler bulundurur.
       */
      footerType: 'defaultFooter';
      actions: ModalActionProps[];
    }
  | {
      /**
       * Bu footer tipinde `footerElement` propu ile gönderilmiş olan elemennt return
       * edilir.
       * - NOTE: Modal ile ilgili tüm aksiyonlar ve stillendirmeler bu `CustomElement` ile yönetilmelidir.
       */
      footerType: 'customFooter';
      footerElement: ReactNode;
    };

export type ModalFooterProps =
  | {
      /**
       * Modal footerını render etmek istemediğimiz zaman bu durumu bu prop ile yönetebiliriz.
       * @defaultValue `true`
       */
      hideFooter: true;
    }
  | ({
      /**
       * Modal footerını render etmek istemediğimiz zaman bu durumu bu prop ile yönetebiliriz.
       * @defaultValue `true`
       */
      hideFooter: false;
    } & FooterContentType);

function ModalFooter(props: ModalFooterProps) {
  /**
   * NOTE: Bu kontrol aynı zamanda `Modal` rootunda da yapılıyor, burada yapma nedenimiz typescriptin typlerı doğru alabilmesi içindir
   */
  if (props.hideFooter) return null;

  if (props.footerType === 'customFooter') return props.footerElement;

  if (props.footerType === 'defaultFooter') {
    if (props.actions.length) {
      return (
        <footer className="flex w-full items-center justify-end gap-2">
          {props.actions.map(action => {
            if (action.actionType === 'button') {
              return (
                <button
                  key={action.actionId}
                  {...action.actionProps}
                  className={cn('btn', action.actionProps.className)}
                />
              );
            } else if (action.actionType === 'link') {
              return (
                <Link
                  key={action.actionId}
                  {...action.actionProps}
                  className={cn('btn', action.actionProps.className)}
                />
              );
            } else {
              return (
                <Dialog.Close
                  key={action.actionId}
                  className={cn('btn', action.actionProps.className)}
                >
                  {action.actionProps.children}
                </Dialog.Close>
              );
            }
          })}
        </footer>
      );
    } else {
      return null;
    }
  }
}
export default ModalFooter;
