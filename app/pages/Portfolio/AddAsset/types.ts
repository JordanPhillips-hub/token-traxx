export type AddAssetProps = {
  isAddingAsset: boolean;
  onClose: () => void;
};

export type CoinCardProps = {
  image: string;
  name: string;
  symbol: string;
};

export type CoinDropdownProps = {
  image: string;
  id: string;
  symbol: string;
  onSelectedCoinChange: (coinId: string) => void;
};

export type DropdownItem = {
  image: string;
  id: string;
  symbol: string;
};