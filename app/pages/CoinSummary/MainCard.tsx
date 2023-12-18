import CardHeader from "./CardHeader";
import Card from "@/app/components/UI/Card";
import PriceOverview from "@/app/components/UI/PriceOverview";
import AllTimeOverview from "@/app/components/UI/AllTimeOverview";

export default function MainCard() {
  return (
    <Card>
      <CardHeader />
      <PriceOverview />
      <hr className="bg-neutral50 border-neutral50" />
      <AllTimeOverview allTime="high" />
      <AllTimeOverview allTime="low" />
    </Card>
  );
}
