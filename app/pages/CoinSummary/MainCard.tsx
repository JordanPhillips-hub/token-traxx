import Image from "next/image";
import Card from "@/app/components/UI/Card";
import Icon from "@/app/components/UI/Icon";

interface MainCardProps {
  image: string;
  header: string;
  site: string;
}

export default function MainCard({ image, header, site }: MainCardProps) {
  return (
    <Card>
      <header>
        <div>
          <div className="inline-block mr-6">
            <Image src={image} alt="Coin" width={48} height={48} />
          </div>
          <div className="inline-block">
            <h1 className="text-2xl	font-bold">{header}</h1>
            <p className="font-medium flex items-center gap-2">
              <span>{site}</span>
              <Icon iconVariant="copy" />
            </p>
          </div>
        </div>
      </header>

      <hr />

      <div></div>

      <div></div>
    </Card>
  );
}
