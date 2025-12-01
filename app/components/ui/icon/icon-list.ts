import { BiHomeAlt } from 'react-icons/bi';
import { HiShieldCheck } from 'react-icons/hi2';
import { LuMoon, LuSun, LuArrowLeft, LuArrowRight, LuChevronDown, LuX, LuLogOut, LuUser, LuSearch } from 'react-icons/lu';
import { RxEyeClosed, RxEyeOpen } from 'react-icons/rx';
import { TbLayoutSidebarLeftExpand } from 'react-icons/tb';
import { VscSettings } from 'react-icons/vsc';

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
  { label: 'home', icon: BiHomeAlt },
  { label: 'settings', icon: VscSettings },
  { label: 'search', icon: LuSearch },
] as const;

export type IconListProps = (typeof iconList)[number]['label'];
