import Icon from "./Icon";
import { copyToClipboard } from "@/app/utils/generalHelpers";

type CopyLinkProps = {
  toCopy: string;
};

export default function CopyLink({ toCopy }: CopyLinkProps) {
  return (
    <p className="font-medium flex items-center gap-2">
      <span>{toCopy}</span>
      <button onClick={() => copyToClipboard(toCopy)}>
        <Icon iconVariant="copy" />
      </button>
    </p>
  );
}
