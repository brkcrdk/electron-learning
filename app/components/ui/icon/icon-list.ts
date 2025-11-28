import { HiShieldCheck } from 'react-icons/hi2';
import { RxEyeClosed, RxEyeOpen } from 'react-icons/rx';

export const iconList = [
  { label: 'eye-open', icon: RxEyeOpen },
  { label: 'eye-closed', icon: RxEyeClosed },
  { label: 'shield-check', icon: HiShieldCheck },
] as const;

export type IconListProps = (typeof iconList)[number]['label'];
