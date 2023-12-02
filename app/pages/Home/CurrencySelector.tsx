import Image from "next/image";
import PrimaryButton from "../../components/UI/Buttons/PrimaryButton";
import PriceChange from "../../components/UI/PriceChange";

type CurrencySelectorProps = {
  img: string;
  name: string;
  price: string;
  percentage: number;
  onClick: () => void;
};

export default function CurrencySelector({
  img,
  name,
  price,
  percentage,
  onClick,
}: CurrencySelectorProps) {
  return (
    <div className="max-w-[250px]">
      <PrimaryButton size="xl" onClick={onClick}>
        <div className="flex items-center gap-4 pointer-events-none">
          <div>
            <Image src={img} alt="Coin Icon" width={32} height={32} />
          </div>

          <div className="text-sm flex-col">
            <p className="font-medium text-left">{name}</p>
            <div className="flex items-center gap-2">
              <p className="text-left">{price} USD</p>
              <PriceChange percentage={percentage} />
            </div>
          </div>
        </div>
      </PrimaryButton>
    </div>
  );
}
