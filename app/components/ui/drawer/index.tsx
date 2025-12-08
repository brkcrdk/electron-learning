import type { LabelHTMLAttributes, PropsWithChildren } from 'react';

import cn from '@app/utils/cn';

import CloseBtn from './close-btn';
import { DrawerContextProvider } from './drawer-context';
import DrawerHeader from './header';

interface Props extends PropsWithChildren {
  triggerProps: LabelHTMLAttributes<HTMLLabelElement>;
  drawerId: string;
}

function Drawer({ children, triggerProps, drawerId }: Props) {
  return (
    <DrawerContextProvider drawerId={drawerId}>
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
            className={cn('btn', triggerProps?.className)}
          />
        </div>

        <div className="drawer-side webkit-no-draggable z-50">
          <label
            htmlFor={drawerId}
            aria-label="close sidebar"
            className="drawer-overlay"
          />
          <div className="menu bg-base-200 max-w-120 min-h-full w-1/2 p-4">{children}</div>
        </div>
      </div>
    </DrawerContextProvider>
  );
}

Drawer.CloseBtn = CloseBtn;
Drawer.Header = DrawerHeader;

export default Drawer;
