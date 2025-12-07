import type { IconBaseProps } from 'react-icons';

import cn from '@app/utils/cn';

import { iconList, type IconListProps } from './icon-list';

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
      className={cn('size-5', props.className)}
    />
  );
}

export default Icon;
