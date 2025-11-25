import { RxEyeClosed, RxEyeOpen } from 'react-icons/rx';

export const iconList = [
  { label: 'eye-open', icon: RxEyeOpen },
  { label: 'eye-closed', icon: RxEyeClosed },
] as const;

export type IconListProps = (typeof iconList)[number]['label'];
