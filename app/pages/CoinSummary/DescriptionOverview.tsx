import CoinDescriptionToggle from "@/app/components/UI/CoinDescriptionToggle";
import CopyButton from "@/app/components/UI/Buttons/CopyButton";
import Card from "@/app/components/UI/Card";
import { useAppSelector } from "@/app/store/hooks";

export default function DescriptionOverview() {
  const { coinSummary } = useAppSelector((state) => state);
  const { description, name } = coinSummary.summaryCoin;
  const { blockchain_site: siteLink } = coinSummary.summaryCoin.links;
  const siteLinks = [siteLink[0], siteLink[1], siteLink[2]];
  const copyLinks = siteLinks.map((link) => (
    <Card key={link} className="w-fit rounded-xl py-4 px-6">
      <CopyButton toCopy={link} />
    </Card>
  ));

  return (
    <section>
      <CoinDescriptionToggle coinName={name} description={description.en} />
      <div className="flex flex-wrap gap-6 mt-6">{copyLinks}</div>
    </section>
  );
}
