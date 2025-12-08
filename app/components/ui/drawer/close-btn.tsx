import type { LabelHTMLAttributes } from 'react';

import cn from '@app/utils/cn';
interface Props extends LabelHTMLAttributes<HTMLLabelElement> {
  drawerId: string;
}

function CloseBtn({ drawerId, ...props }: Props) {
  return (
    <label
      htmlFor={drawerId}
      {...props}
      className={cn('btn btn-primary btn-soft', props.className)}
    />
  );
}

export default CloseBtn;
