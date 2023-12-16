import Image from "next/image";
import Icon from "@/app/components/UI/Icon";

export default function CardHeader() {
  return (
    <header className="flex items-center">
      <Image src={""} alt="" width={48} height={48} />
      <div>
        <h1 className="text-2xl	font-bold">Bitcoin (BTC)</h1>
        <p className="font-medium">
          <span>www.bitcoin.org</span>
          {/* <Icon/> */}
        </p>
      </div>
    </header>
  );
}
