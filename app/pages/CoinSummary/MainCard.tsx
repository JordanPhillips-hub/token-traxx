import CardHeader from "./CardHeader";
import Card from "@/app/components/UI/Card";
import PriceOverview from "@/app/components/PriceOverview";
import AllTimeOverview from "@/app/components/AllTimeOverview";

export default function MainCard() {
  return (
    <Card className="py-10 px-8 rounded-xl">
      <CardHeader />
      <PriceOverview />
      <hr className="bg-neutral50 border-neutral50" />
      <AllTimeOverview allTime="high" />
      <AllTimeOverview allTime="low" />
    </Card>
  );
}
