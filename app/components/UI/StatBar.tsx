import ProgressBar from "@ramonak/react-progress-bar";

type StatBarProps = {
  completed: number;
  maxCompleted?: number;
  bgColor?: string;
  baseBgColor?: string;
  height?: string;
  width?: string;
};

export default function StatBar({
  completed,
  maxCompleted,
  bgColor,
  baseBgColor,
  height,
  width,
}: StatBarProps) {
  return (
    <ProgressBar
      completed={completed}
      maxCompleted={maxCompleted}
      animateOnRender={true}
      labelColor="transparent"
      baseBgColor={baseBgColor ?? "var(--statbar-track)"}
      bgColor={bgColor ?? "var(--statbar-fill)"}
      height={height ?? "5px"}
      width={width}
    />
  );
}
