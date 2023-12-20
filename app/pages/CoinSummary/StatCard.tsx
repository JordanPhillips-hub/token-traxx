import ProgressBar from "@ramonak/react-progress-bar";
import Card from "@/app/components/UI/Card";
import CoinStat from "@/app/components/UI/CoinStat";
import { formatPrice } from "@/app/utils/numberFormatting";

type StatCardProps = {
  stats: Record<string, number>;
  hasStatusBar: boolean;
  completed?: number;
};

export default function StatCard({
  stats,
  hasStatusBar,
  completed,
}: StatCardProps) {
  return (
    <Card className="py-10 px-8">
      <div className="flex flex-col gap-8">
        {Object.entries(stats).map(([name, stat]) => (
          <CoinStat key={name} statName={name} stat={formatPrice(stat)} />
        ))}
        {hasStatusBar && completed !== undefined && (
          <div className="relative mt-8">
            <p className="text-accent300 text-xs absolute bottom-2 left-0">
              {completed && isFinite(completed)
                ? Math.floor(completed) + "%"
                : "N/A"}
            </p>
            <p className="text-xs absolute bottom-2 right-0">100%</p>
            <ProgressBar
              completed={completed}
              animateOnRender={true}
              labelColor="transparent"
              baseBgColor="hsla(0, 0%, 100%, 0.5)"
              bgColor="hsl(33, 93%, 54%)"
              height="5px"
            />
          </div>
        )}
      </div>
    </Card>
  );
}
