import type Dropdown from '../dropdown';
import type { LinkComponentProps } from '@tanstack/react-router';
import type { ButtonHTMLAttributes, ComponentPropsWithoutRef, ReactNode } from 'react';

export type TableActionsProps =
  | { actionId: string; actionType: 'button'; actionProps: ButtonHTMLAttributes<HTMLButtonElement> }
  | { actionId: string; actionType: 'dropdown'; actionProps: ComponentPropsWithoutRef<typeof Dropdown> }
  | { actionId: string; actionType: 'link'; actionProps: LinkComponentProps }
  | { actionId: string; actionType: 'custom'; actionElement: ReactNode };
