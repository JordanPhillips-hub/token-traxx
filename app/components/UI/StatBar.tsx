import ProgressBar from "@ramonak/react-progress-bar";

type StatBarProps = {
  completed: number;
  maxCompleted?: number;
  bgColor: string;
  height?: string;
  width?: string;
};

export default function StatBar({
  completed,
  maxCompleted,
  bgColor,
  height,
  width,
}: StatBarProps) {
  return (
    <ProgressBar
      completed={completed}
      maxCompleted={maxCompleted}
      animateOnRender={true}
      labelColor="transparent"
      baseBgColor="hsla(0, 0%, 100%, 0.5)"
      bgColor={bgColor}
      height={height ? height : "5px"}
      width={width}
    />
  );
}
