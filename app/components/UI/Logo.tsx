import Image from "next/image";
import CompanyLogo from "../../assets/images/token-trax-logo.svg";

export default function Logo() {
  return (
    <div className="flex items-center gap-3">
      <Image
        src={CompanyLogo}
        alt="company logo sideways figure eight color purple"
        width={36}
        height={20}
      />
      <h1 className="text-xl font-bold">Token Trax</h1>
    </div>
  );
}
