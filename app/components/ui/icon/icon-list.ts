import { BiHomeAlt } from 'react-icons/bi';
import { BsEasel2 } from 'react-icons/bs';
import { GoFileDirectory } from 'react-icons/go';
import { HiShieldCheck } from 'react-icons/hi2';
import { IoFolderOpenOutline } from 'react-icons/io5';
import {
  LuMoon,
  LuSun,
  LuArrowLeft,
  LuArrowRight,
  LuChevronDown,
  LuChevronRight,
  LuX,
  LuLogOut,
  LuUser,
  LuSearch,
  LuArrowUp,
  LuArrowDown,
  LuUsers,
  LuPencil,
  LuLoaderCircle,
  LuCheck,
  LuTrash,
  LuFolder,
  LuBook,
  LuTriangleAlert,
  LuZoomIn,
  LuZoomOut,
} from 'react-icons/lu';
import { MdMoreHoriz } from 'react-icons/md';
import { PiWarningCircleFill } from 'react-icons/pi';
import { RxEyeClosed, RxEyeOpen } from 'react-icons/rx';
import { TbLayoutSidebarLeftExpand, TbContrastFilled } from 'react-icons/tb';
import { VscSettings } from 'react-icons/vsc';

export const iconList = [
  { label: 'eye-open', icon: RxEyeOpen },
  { label: 'eye-closed', icon: RxEyeClosed },
  { label: 'shield-check', icon: HiShieldCheck },
  { label: 'moon', icon: LuMoon },
  { label: 'sun', icon: LuSun },
  { label: 'arrow-left', icon: LuArrowLeft },
  { label: 'arrow-right', icon: LuArrowRight },
  { label: 'arrow-up', icon: LuArrowUp },
  { label: 'arrow-down', icon: LuArrowDown },
  { label: 'chevron-down', icon: LuChevronDown },
  { label: 'chevron-right', icon: LuChevronRight },
  { label: 'more-horizontal', icon: MdMoreHoriz },
  { label: 'close', icon: LuX },
  { label: 'sidebar-expand', icon: TbLayoutSidebarLeftExpand },
  { label: 'logout', icon: LuLogOut },
  { label: 'user', icon: LuUser },
  { label: 'home', icon: BiHomeAlt },
  { label: 'settings', icon: VscSettings },
  { label: 'search', icon: LuSearch },
  { label: 'folder-open-outline', icon: IoFolderOpenOutline },
  { label: 'circle-warning-full', icon: PiWarningCircleFill },
  { label: 'users', icon: LuUsers },
  { label: 'pencil', icon: LuPencil },
  { label: 'loader-circle', icon: LuLoaderCircle },
  { label: 'contrast-filled', icon: TbContrastFilled },
  { label: 'check', icon: LuCheck },
  { label: 'trash', icon: LuTrash },
  { label: 'folder', icon: LuFolder },
  { label: 'book', icon: LuBook },
  { label: 'alert-triangle', icon: LuTriangleAlert },
  { label: 'zoom-in', icon: LuZoomIn },
  { label: 'zoom-out', icon: LuZoomOut },
  { label: 'easel', icon: BsEasel2 },
  { label: 'file-directory', icon: GoFileDirectory },
] as const;

export type IconListProps = (typeof iconList)[number]['label'];
