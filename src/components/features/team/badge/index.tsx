import { CircularProgressBar } from "@tomickigrzegorz/react-circular-progress-bar";
import IcDone from "@/assets/icons/ic-done.svg";
const percent = 25;

const props = {
  colorCircle: "var(--white)",
  colorSlice: "var(--pink-400)",
  stroke: 15,
  speed: 60,
  cut: 0,
  rotation: 90,
  inverse: true,
  animationOff: false,
  fill: "none",
  round: true,
  number: false,
};

export default function Badge() {
  let todo = 5;
  const done = 2;

  return (
    <div className="flex h-[25px] w-[58px] items-center justify-between rounded-xl bg-gray-900 px-2">
      {todo === 0 || done / todo === 1 ? (
        <IcDone className="h-4 w-4" />
      ) : (
        <CircularProgressBar percent={percent} size={12} {...props} />
      )}
      <p className="text-pink-400">
        {done}/{todo}
      </p>
    </div>
  );
}
