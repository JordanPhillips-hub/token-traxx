export type ConvertorProps = {
  isOpen: boolean;
  onClose: () => void;
};

export type ConvertorCardProps = {
  cardType: string;
  cardName: string;
};

export type DropdownProps = {
  cardType: string;
  image: string;
  name: string;
  id: string;
  symbol: string;
};

export type DropdownItem = {
  image: string;
  id: string;
  symbol: string;
};

export type LegendProps = {
  symbol: string;
  price: number;
  currencySymbol: string;
};