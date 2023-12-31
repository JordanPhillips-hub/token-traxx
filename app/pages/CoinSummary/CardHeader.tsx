import Image from "next/image";
import { useAppSelector } from "@/app/store/hooks";
import CopyButton from "@/app/components/UI/Buttons/CopyButton";

export default function CardHeader() {
  const { summaryCoin } = useAppSelector((state) => state.coinSummary);
  const { name, symbol } = summaryCoin;
  const { small: coinImage } = summaryCoin.image;
  const { homepage: copyLink } = summaryCoin.links;
  const formattedLink = copyLink[0]
    .replace(/^https?:\/\//, "")
    .replace(/\//g, "");

  return (
    <header>
      <div>
        <div className="inline-block mr-6">
          <Image src={coinImage} alt={`${name} icon`} width={48} height={48} />
        </div>
        <div className="inline-block">
          <h1 className="text-2xl	font-bold">{`${name} (${symbol.toUpperCase()})`}</h1>
          <CopyButton toCopy={formattedLink} />
        </div>
      </div>
    </header>
  );
}
