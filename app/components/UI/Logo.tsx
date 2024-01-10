import Image from "next/image";
import { Heading } from "./Heading";
import CompanyLogo from "@/app/assets/images/token-trax-logo.svg";

export default function Logo() {
  return (
    <div className="flex items-center gap-3">
      <Image
        src={CompanyLogo}
        alt="company logo sideways figure eight color purple"
        width={36}
        height={20}
      />
      <Heading
        containerClass="mb-0"
        textClass="font-bold"
        text="Token Traxx"
        size={1}
      />
    </div>
  );
}
