import Icon, { type IconProps } from '@app/components/ui/icon';
import cn from '@app/utils/cn';

function Spinner({ className, ...props }: Omit<IconProps, 'name'>) {
  return (
    <Icon
      name="loader-circle"
      role="status"
      aria-label="Loading"
      className={cn('size-4 animate-spin', className)}
      {...props}
    />
  );
}

export default Spinner;
