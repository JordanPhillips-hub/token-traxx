import Image from "next/image";
import { formatCoinName } from "@/app/utils/generalHelpers";

type CoinNameProps = {
  hasImage?: boolean;
  image: string;
  imageWidth?: number;
  imageHeight?: number;
  id: string;
  symbol: string;
};

export default function CoinName({
  hasImage,
  image,
  imageWidth,
  imageHeight,
  id,
  symbol,
}: CoinNameProps) {
  return (
    <div className="flex items-center gap-2 text-sm">
      {hasImage && (
        <Image
          src={image}
          alt={`${id} icon`}
          width={imageWidth}
          height={imageHeight}
        />
      )}
      <p>{formatCoinName(id ?? "", symbol ?? "")}</p>
    </div>
  );
}
