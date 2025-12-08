import type { LabelHTMLAttributes } from 'react';

import cn from '@app/utils/cn';

import { useDrawerContext } from './drawer-context';

function CloseBtn(props: LabelHTMLAttributes<HTMLLabelElement>) {
  const { drawerId } = useDrawerContext();
  return (
    <label
      htmlFor={drawerId}
      {...props}
      className={cn('btn btn-soft btn-square', props.className)}
    />
  );
}

export default CloseBtn;
