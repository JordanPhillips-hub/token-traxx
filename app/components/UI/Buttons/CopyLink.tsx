import Icon from "../Icon";
import { copyToClipboard } from "@/app/utils/generalHelpers";

type CopyLinkProps = {
  toCopy: string;
};

export default function CopyLink({ toCopy }: CopyLinkProps) {
  return (
    <button
      className="font-medium flex items-center gap-2 ease-in-out hover:text-neutral600 hover:underline"
      onClick={() => copyToClipboard(toCopy)}
    >
      <span>{toCopy}</span>
      <Icon iconVariant="copy" />
    </button>
  );
}
