import type { LabelHTMLAttributes } from 'react';

import cn from '@app/utils/cn';

function CloseBtn(props: LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      htmlFor="drawer-component"
      {...props}
      className={cn('btn btn-primary btn-soft', props.className)}
    />
  );
}

export default CloseBtn;
