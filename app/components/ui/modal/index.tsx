import { Dialog } from 'radix-ui';
import { type PropsWithChildren } from 'react';

import ModalHeader, { type ModalHeaderProps } from './modal-header';
import cn from '../../../utils/cn';

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
} & PropsWithChildren;

function Modal({ children, triggerProps, rootProps, portalProps, contentProps, headerProps = { hideHeader: true } }: Props) {
  return (
    <Dialog.Root {...rootProps}>
      <Dialog.Trigger {...triggerProps} />
      <Dialog.Portal {...portalProps}>
        <Dialog.Overlay className="z-popover-overlay fixed inset-0 bg-gray-900/60" />
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
        </Dialog.Content>
        {/* <Dialog.Content
          {...contentProps}
          className={cn(
            'z-popover-content fixed inset-0 m-auto flex h-fit max-h-[80vh] w-[90%] flex-col items-start justify-center gap-2 overflow-auto rounded-lg bg-white p-4 md:max-w-[630px] md:gap-3',
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
        </Dialog.Content> */}
      </Dialog.Portal>
    </Dialog.Root>
  );
}
export default Modal;
