import type { ComponentProps } from 'react';

import { Command } from 'cmdk';

function CommandEmpty({ ...props }: ComponentProps<typeof Command.Empty>) {
  return (
    <Command.Empty
      data-slot="command-empty"
      className="py-6 text-center text-sm"
      {...props}
    />
  );
}

export default CommandEmpty;
