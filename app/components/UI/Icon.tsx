import { CiSearch } from "react-icons/ci";
import { BiSolidChevronDown, BiSolidChevronUp } from "react-icons/bi";
import { BsSun, BsMoon } from "react-icons/bs";
import { IoLayersSharp, IoLayersOutline } from "react-icons/io5";
import { VscGraphLine } from "react-icons/vsc";
import { GiCardExchange } from "react-icons/gi";
import { RiHome5Fill, RiHome4Line, RiCoinFill } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import { MdOutlineContentCopy } from "react-icons/md";
import {
  PiCurrencyDollarFill,
  PiCaretUpBold,
  PiCaretDownBold,
} from "react-icons/pi";

type Icons = {
  [key: string]: React.ElementType<any>;
};

const icons: Icons = {
  search: CiSearch,
  dollar: PiCurrencyDollarFill,
  chevDown: BiSolidChevronDown,
  chevUp: BiSolidChevronUp,
  sun: BsSun,
  moon: BsMoon,
  arrowUp: PiCaretUpBold,
  arrowDown: PiCaretDownBold,
  homeSolid: RiHome5Fill,
  homeOutline: RiHome4Line,
  layerSolid: IoLayersSharp,
  layerOutline: IoLayersOutline,
  graph: VscGraphLine,
  coin: RiCoinFill,
  exchange: GiCardExchange,
  exit: RxCross2,
  copy: MdOutlineContentCopy,
};

type props = {
  iconVariant: string;
  className?: string;
};

export default function Icon({ iconVariant, className }: props) {
  const IconVariant = icons[iconVariant];
  return <IconVariant className={className} type={iconVariant} />;
}
