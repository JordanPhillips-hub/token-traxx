import Icon from "../../Icon/Icon";

type CustomSelectProps = {
  iconRight: string;
  iconLeft: string;
};

export default function CustomSelect({
  iconRight,
  iconLeft,
}: CustomSelectProps) {
  return (
    <div className="dark:bg-primary800 relative py-2.5 px-3 rounded-md">
      <button className="text-sm flex items-center gap-2">
        <div className="p-1 rounded-full">
          <Icon iconVariant={iconLeft} className="text-lg" />
        </div>
        USD
        <Icon iconVariant={iconRight} />
      </button>

      <div
        className={`dark:bg-primary800 absolute w-full right-0 rounded-md top-12`}
      >
        <ul className="text-center hidden">
          <li>
            <button>$USD</button>
          </li>
        </ul>
      </div>
    </div>
  );
}
