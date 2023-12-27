import { CoinCard } from "./CoinCard";
import Form from "./Form";
import { useAppSelector } from "@/app/store/hooks";
import Modal from "@/app/components/UI/Modal";
import Icon from "@/app/components/UI/Icon";

type AddAssetProps = {
  isAddingAsset: boolean;
  onClose: () => void;
};

export default function AddAsset({ isAddingAsset, onClose }: AddAssetProps) {
  const { coins } = useAppSelector((state) => state.coinMarkets);
  const { selectedCoinId } = useAppSelector((state) => state.portfolio);
  const selectedCoin = coins.find((coin) => coin.id === selectedCoinId);
  const { image, name, symbol } = selectedCoin;

  return (
    <Modal
      className="bg-blue900 w-1/2 rounded-2xl p-12"
      isOpen={isAddingAsset}
      onClose={onClose}
    >
      <header className="flex items-center justify-between mb-8">
        <h3 className="text-xl">Select Coin</h3>
        <button
          className="bg-transparent w-5 h-5 flex items-center justify-center border border-white rounded-full"
          onClick={onClose}
        >
          <Icon iconVariant="exit" />
        </button>
      </header>

      <div className="grid grid-cols-2 gap-8">
        <CoinCard image={image} name={name} symbol={symbol} />
        <Form onClose={onClose} />
      </div>
    </Modal>
  );
}
