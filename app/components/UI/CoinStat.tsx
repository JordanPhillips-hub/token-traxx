import EllipsePlusIcon from "./EllipsePlusIcon";

type CoinStatProps = {
  statName: string;
  stat: string;
};

export default function CoinStat({ statName, stat }: CoinStatProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex gap-3">
        <EllipsePlusIcon />
        <p>{statName}</p>
      </div>
      <p className="text-xl font-medium">{stat}</p>
    </div>
  );
}
