import type { LabelHTMLAttributes, PropsWithChildren } from 'react';

import cn from '@app/utils/cn';

import CloseBtn from './close-btn';
import Icon from '../icon';

interface Props extends PropsWithChildren {
  triggerProps: LabelHTMLAttributes<HTMLLabelElement>;
  drawerId: string;
  /**
   * Drawer headerında kapatma iconunu render edip etmeyeceğimizi belirten proptur
   * @defaultValue `true`
   */
  hasCloseIcon?: boolean;
}

function Drawer({ children, triggerProps, hasCloseIcon = true, drawerId }: Props) {
  return (
    <div className="drawer drawer-end">
      <input
        id={drawerId}
        type="checkbox"
        className="drawer-toggle"
      />
      <div className="drawer-content">
        <label
          htmlFor={drawerId}
          {...triggerProps}
          className={cn('btn btn-primary', triggerProps?.className)}
        />
      </div>

      <div className="drawer-side webkit-no-draggable z-50">
        <label
          htmlFor={drawerId}
          aria-label="close sidebar"
          className="drawer-overlay"
        />
        <div className="menu bg-base-200 max-w-120 min-h-full w-1/2 p-4">
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
          {children}
        </div>
      </div>
    </div>
  );
}

Drawer.CloseBtn = CloseBtn;

export default Drawer;
