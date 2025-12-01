import { HiShieldCheck } from 'react-icons/hi2';
import { LuMoon, LuSun, LuArrowLeft, LuArrowRight, LuChevronDown, LuX, LuLogOut, LuUser } from 'react-icons/lu';
import { RxEyeClosed, RxEyeOpen } from 'react-icons/rx';
import { TbLayoutSidebarLeftExpand } from 'react-icons/tb';

export const iconList = [
  { label: 'eye-open', icon: RxEyeOpen },
  { label: 'eye-closed', icon: RxEyeClosed },
  { label: 'shield-check', icon: HiShieldCheck },
  { label: 'moon', icon: LuMoon },
  { label: 'sun', icon: LuSun },
  { label: 'arrow-left', icon: LuArrowLeft },
  { label: 'arrow-right', icon: LuArrowRight },
  { label: 'chevron-down', icon: LuChevronDown },
  { label: 'close', icon: LuX },
  { label: 'sidebar-expand', icon: TbLayoutSidebarLeftExpand },
  { label: 'logout', icon: LuLogOut },
  { label: 'user', icon: LuUser },
] as const;

export type IconListProps = (typeof iconList)[number]['label'];
