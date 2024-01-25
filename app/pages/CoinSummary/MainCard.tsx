import CardHeader from "./CardHeader";
import AllTimeOverview from "./AllTimeOverview";
import PriceOverview from "./PriceOverview";
import Card from "@/app/components/UI/Card";

export default function MainCard() {
  return (
    <section>
      <Card className="py-10 px-8">
        <CardHeader />
        <PriceOverview />
        <hr className="bg-whiteOpac900 border-whiteOpac900" />
        <AllTimeOverview allTime="high" />
        <AllTimeOverview allTime="low" />
      </Card>
    </section>
  );
}
