import Image from "next/image";
import { formatCoinName } from "@/app/utils/generalHelpers";

type CoinNameProps = {
  img: string;
  imgWidth: number;
  imgHeight: number;
  id: string;
  symbol: string;
};

export default function CoinName({
  img,
  imgWidth,
  imgHeight,
  id,
  symbol,
}: CoinNameProps) {
  return (
    <div className="flex items-center gap-2">
      <Image src={img} alt={`${id} icon`} width={imgWidth} height={imgHeight} />
      <p>{formatCoinName(id ?? "", symbol ?? "")}</p>
    </div>
  );
}
