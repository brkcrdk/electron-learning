import type { ComponentPropsWithoutRef } from 'react';

import { type LinkComponentProps } from '@tanstack/react-router';
import type { DropdownMenu } from 'radix-ui';

import type Icon from '../icon';

interface DefaultDropdownItemProps extends DropdownMenu.DropdownMenuItemProps {
  icon?: ComponentPropsWithoutRef<typeof Icon>;
  isLoading?: boolean;
  /**
   * @description
   * Bu prop, dropdown itemin seçili olduğunu belirtir. Component bu sayede aktif state olduğunu render edebilir.
   */
  'data-highlighted'?: '';
  /**
   * @description
   * Bu prop, dropdown itemin `danger` stil variantı ile render edileceğini ifade eder.
   * Normal stil renklerini override edebilir. Bu renk paletine çok sık ihtiyaç duyulduğu için
   * data attribute vererek prop aktarımı yapmadan yönetiyoruz.
   */
  'data-danger'?: '';
}

interface LinkItemProps extends LinkComponentProps {
  icon?: ComponentPropsWithoutRef<typeof Icon>;
}

interface DropdownDefaultItemProps {
  itemType: 'default';
  dropdownItemId: string;
  itemProps: DefaultDropdownItemProps;
}

interface DropdownCustomItemProps {
  itemType: 'custom';
  dropdownItemId: string;
  itemProps: DropdownMenu.DropdownMenuItemProps;
}

interface DropdownLabelItemProps {
  itemType: 'label';
  dropdownItemId: string;
  itemProps: DropdownMenu.DropdownMenuLabelProps;
}

interface DropdownSeparatorItemProps {
  itemType: 'separator';
  dropdownItemId: string;
  itemProps?: DropdownMenu.DropdownMenuSeparatorProps;
}

interface DropdownLinkItemProps {
  itemType: 'link';
  dropdownItemId: string;
  itemProps: LinkItemProps;
}

export type DropdownItemProps =
  | DropdownDefaultItemProps
  | DropdownCustomItemProps
  | DropdownSeparatorItemProps
  | DropdownLabelItemProps
  | DropdownLinkItemProps;
