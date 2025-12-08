import type { HTMLAttributes } from 'react';

import cn from '@app/utils/cn';

function DrawerFooter(props: HTMLAttributes<HTMLElement>) {
  return (
    <footer
      {...props}
      className={cn('sticky bottom-0 mt-auto flex gap-2 p-4 pt-0', props.className)}
    />
  );
}

export default DrawerFooter;
