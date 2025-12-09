import type { ComponentPropsWithoutRef, ReactNode } from 'react';

import type { LinkComponentProps } from '@tanstack/react-router';

import type Button from '../ui/button';

export type TableActionsProps =
  | { actionId: string; actionType: 'button'; actionProps: ComponentPropsWithoutRef<typeof Button> }
  | { actionId: string; actionType: 'link'; actionProps: LinkComponentProps }
  | { actionId: string; actionType: 'custom'; actionElement: ReactNode };
