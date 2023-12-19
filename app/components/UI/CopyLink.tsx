import Icon from "./Icon";

type CopyLinkProps = {
  toCopy: string;
};

export default function CopyLink({ toCopy }: CopyLinkProps) {
  return (
    <p className="font-medium flex items-center gap-2">
      <span>{toCopy}</span>
      <button>
        <Icon iconVariant="copy" />
      </button>
    </p>
  );
}
