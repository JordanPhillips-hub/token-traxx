import Card from "@/app/components/UI/Card";
import CoinStat from "@/app/components/UI/CoinStat";
import StatBar from "@/app/components/UI/StatBar";
import { formatCurrency } from "@/app/utils/numberFormatting";

type StatCardProps = {
  stats: Record<string, number>;
  hasStatusBar?: boolean;
  completed?: number;
};

export default function StatCard({
  stats,
  hasStatusBar,
  completed,
}: StatCardProps) {
  const coinStats = Object.entries(stats).map(([name, stat]) => (
    <CoinStat key={name} statName={name} stat={formatCurrency(stat)} />
  ));

  const statDisplayValue =
    completed && isFinite(completed) ? Math.floor(completed) + "%" : "N/A";

  return (
    <Card className="py-10 px-8">
      <div className="flex flex-col gap-8">
        {coinStats}
        {hasStatusBar && completed !== undefined && (
          <div className="relative mt-8">
            <p className="text-orange500 text-xs absolute bottom-2 left-0">
              {statDisplayValue}
            </p>
            <p className="text-xs absolute bottom-2 right-0">100%</p>
            <StatBar completed={completed} bgColor="hsl(33, 93%, 54%)" />
          </div>
        )}
      </div>
    </Card>
  );
}
