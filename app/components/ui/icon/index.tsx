import { iconList, type IconListProps } from './icon-list';

import type { IconBaseProps } from 'react-icons';

export interface IconProps extends Omit<IconBaseProps, 'color' | 'size'> {
  name: IconListProps;
}

function Icon({ name, ...props }: IconProps) {
  const selectedIcon = iconList.find(icon => icon.label === name);

  if (!selectedIcon) return null;
  const IconComponent = selectedIcon.icon;

  return (
    <IconComponent
      name={name}
      {...props}
    />
  );
}

export default Icon;
