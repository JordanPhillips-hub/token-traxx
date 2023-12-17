import Image from "next/image";
import { useAppSelector } from "@/app/store/hooks";
import Icon from "@/app/components/UI/Icon";

export default function CardHeader() {
  const { summaryCoin } = useAppSelector((state) => state.coinSummary);

  return (
    <header>
      <div>
        <div className="inline-block mr-6">
          <Image
            src={summaryCoin.image.small}
            alt={`${summaryCoin.name} icon`}
            width={48}
            height={48}
          />
        </div>
        <div className="inline-block">
          <h1 className="text-2xl	font-bold">{`${
            summaryCoin.name
          } (${summaryCoin.symbol.toUpperCase()})`}</h1>
          <p className="font-medium flex items-center gap-2">
            <span>{summaryCoin.links.homepage[0]}</span>
            <Icon iconVariant="copy" />
          </p>
        </div>
      </div>
    </header>
  );
}
