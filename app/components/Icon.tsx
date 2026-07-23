import type { ComponentType, SVGProps } from "react";
import {
  ViewfinderCircleIcon,
  ShieldCheckIcon,
  BoltIcon,
  ChartBarIcon,
  ArrowPathIcon,
  DevicePhoneMobileIcon,
  TvIcon,
  FilmIcon,
  ScissorsIcon,
  ArrowsPointingOutIcon,
  ArrowTrendingUpIcon,
  PuzzlePieceIcon,
  ArrowsUpDownIcon,
  PaintBrushIcon,
  CheckBadgeIcon,
  ChatBubbleLeftRightIcon,
  MusicalNoteIcon,
  BriefcaseIcon,
  BeakerIcon,
  SignalIcon,
  MagnifyingGlassIcon,
  LinkIcon,
  WrenchScrewdriverIcon,
  UserGroupIcon,
  DocumentCheckIcon,
  CheckIcon,
  XMarkIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

// Semantic name → Heroicon. Names describe the point the icon marks,
// so the same visual reads consistently everywhere it's used.
const ICONS: Record<string, IconComponent> = {
  viewfinder: ViewfinderCircleIcon, // targeting / precision / goals
  shield: ShieldCheckIcon, // brand safety / verification
  bolt: BoltIcon, // speed / ML optimisation
  "chart-bar": ChartBarIcon, // analytics / reporting
  "arrow-path": ArrowPathIcon, // dynamic / rotation / full-funnel
  "device-mobile": DevicePhoneMobileIcon, // mobile / cross-device
  tv: TvIcon, // CTV / connected TV
  film: FilmIcon, // video / OTT / production
  scissors: ScissorsIcon, // creative sequencing / cuts
  expand: ArrowsPointingOutIcon, // expandable units
  "trending-up": ArrowTrendingUpIcon, // completion / growth analytics
  puzzle: PuzzlePieceIcon, // gamified units
  scroll: ArrowsUpDownIcon, // interscroller / adhesion
  "paint-brush": PaintBrushIcon, // DCO / creative
  "check-badge": CheckBadgeIcon, // certified / compatible
  chat: ChatBubbleLeftRightIcon, // social / Meta
  music: MusicalNoteIcon, // TikTok / audio-first
  briefcase: BriefcaseIcon, // B2B / LinkedIn
  beaker: BeakerIcon, // testing / experiments
  signal: SignalIcon, // CAPI / data clean rooms
  search: MagnifyingGlassIcon, // audience research
  link: LinkIcon, // integrations / SSP connections
  wrench: WrenchScrewdriverIcon, // engineering / build
  users: UserGroupIcon, // partnership / people
  document: DocumentCheckIcon, // spec compliance (VAST)
  check: CheckIcon, // success / done
  xmark: XMarkIcon, // close
  bars: Bars3Icon, // menu
};

export function Icon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Cmp = ICONS[name] ?? ViewfinderCircleIcon;
  return <Cmp className={className} aria-hidden="true" />;
}
