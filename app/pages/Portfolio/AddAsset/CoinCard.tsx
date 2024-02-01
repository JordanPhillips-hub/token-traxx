import Image from "next/image";
import { CoinCardProps } from "./types";
import Card from "@/app/components/UI/Card";
import { optionalCapitalize } from "@/app/utils/generalHelpers";

export function CoinCard({ image, name, symbol }: CoinCardProps) {
  return (
    <Card className="flex flex-col items-center justify-center gap-4">
      <div className="bg-[#2C2C4A] flex items-center justify-center w-1/4 h-1/3 rounded-lg">
        <Image src={image} alt={`${name} logo`} width={42} height={42} />
      </div>
      <p className="text-3xl font-bold">{`${optionalCapitalize(name)} (${symbol.toUpperCase()})`}</p>
    </Card>
  );
}
