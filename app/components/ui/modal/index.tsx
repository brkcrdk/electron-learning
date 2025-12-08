import { type ButtonHTMLAttributes, type PropsWithChildren } from 'react';

import { type LinkComponentProps } from '@tanstack/react-router';
import { Dialog } from 'radix-ui';

import cn from '@app/utils/cn';

import ModalFooter, { type ModalFooterProps } from './modal-footer';
import ModalHeader, { type ModalHeaderProps } from './modal-header';

export type ModalActionProps =
  | { actionId: string; actionType: 'button'; actionProps: ButtonHTMLAttributes<HTMLButtonElement> }
  | { actionId: string; actionType: 'close'; actionProps: ButtonHTMLAttributes<HTMLButtonElement> }
  | { actionId: string; actionType: 'link'; actionProps: LinkComponentProps };

type Props = {
  rootProps?: Dialog.DialogProps;
  triggerProps: Dialog.DialogTriggerProps;
  portalProps?: Dialog.DialogPortalProps;
  contentProps?: Dialog.DialogContentProps;

  /**
   * Modal headerına ait aksiyonları ve headerı yönetebileceğimiz propları ifade ederi
   * @defaultValue ```ts
   * {
   *   hideHeader:false,
   *   title: 'Title'
   * }
   * ```
   */
  headerProps?: ModalHeaderProps;
  footerProps?: ModalFooterProps;
} & PropsWithChildren;

function Modal({
  children,
  triggerProps,
  rootProps,
  portalProps,
  contentProps,
  headerProps = { hideHeader: true },
  footerProps = { hideFooter: true },
}: Props) {
  return (
    <Dialog.Root {...rootProps}>
      <Dialog.Trigger {...triggerProps} />
      <Dialog.Portal {...portalProps}>
        <Dialog.Overlay className="z-popover-overlay bg-base-300/60 fixed inset-0" />
        <Dialog.Content
          className={cn(
            'z-popover-content w-180 fixed inset-0 m-auto flex h-fit max-h-[80vh] flex-col items-start justify-center gap-2 overflow-auto rounded-lg bg-white p-4',
            contentProps?.className
          )}
        >
          {headerProps.hideHeader ? (
            <>
              <Dialog.Title className="sr-only">Untitled Modal</Dialog.Title>
              <Dialog.Description className="sr-only">Untitled Modal</Dialog.Description>
            </>
          ) : (
            <ModalHeader {...headerProps} />
          )}
          {children}
          {!footerProps.hideFooter && <ModalFooter {...footerProps} />}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
export default Modal;
