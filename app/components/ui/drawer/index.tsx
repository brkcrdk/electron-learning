import type { LabelHTMLAttributes, PropsWithChildren } from 'react';

import cn from '@app/utils/cn';

import CloseBtn from './close-btn';

interface Props extends PropsWithChildren {
  triggerProps: LabelHTMLAttributes<HTMLLabelElement>;
}

function Drawer({ children, triggerProps }: Props) {
  return (
    <div className="drawer drawer-end">
      <input
        id="drawer-component"
        type="checkbox"
        className="drawer-toggle"
      />
      <div className="drawer-content">
        <label
          htmlFor="drawer-component"
          {...triggerProps}
          className={cn('btn btn-primary', triggerProps?.className)}
        />
      </div>

      <div className="drawer-side webkit-no-draggable z-50">
        <label
          htmlFor="drawer-component"
          aria-label="close sidebar"
          className="drawer-overlay"
        />
        <div className="menu bg-base-200 max-w-120 min-h-full w-1/2 p-4">{children}</div>
      </div>
    </div>
  );
}

Drawer.CloseBtn = CloseBtn;

export default Drawer;
