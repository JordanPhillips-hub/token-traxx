import { useTheme } from "next-themes";
import Icon from "@/app/components/UI/Icon";

export default function ThemeButton() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      className="dark:bg-blue800 p-3 rounded-md focused-primary"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? (
        <Icon iconVariant="sun" className="text-2xl" />
      ) : (
        <Icon iconVariant="moon" className="text-2xl" />
      )}
    </button>
  );
}
