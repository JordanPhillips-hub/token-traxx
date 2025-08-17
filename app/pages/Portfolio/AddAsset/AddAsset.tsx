import { CoinCard } from "./CoinCard";
import Form from "./Form";
import { AddAssetProps } from "./types";
import { useAppSelector } from "@/app/store/hooks";
import Modal from "@/app/components/UI/Modal";
import { Heading } from "@/app/components/UI/Heading";
import CloseButton from "@/app/components/UI/Buttons/CloseButton";
import { useFindSelectedCoin } from "@/app/hooks/helpers";

export default function AddAsset({ isAddingAsset, onClose }: AddAssetProps) {
  const { selectedCoinId } = useAppSelector((state) => state.portfolio);
  const { image, name, symbol } = useFindSelectedCoin(selectedCoinId);

  return (
    <Modal
      className="dark:bg-blue900 w-1/2 rounded-2xl p-12"
      isOpen={isAddingAsset}
      onClose={onClose}
    >
      <div className="flex items-center justify-between mb-8">
        <Heading size={2} text="Select Coin" />
        <CloseButton onClose={onClose} />
      </div>

      <div className="grid grid-cols-2 gap-8">
        <CoinCard image={image} name={name} symbol={symbol} />
        <Form onClose={onClose} />
      </div>
    </Modal>
  );
}
