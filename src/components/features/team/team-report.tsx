import { CircularProgressBar } from "@tomickigrzegorz/react-circular-progress-bar";
import Image from "next/image";

const props = {
  colorCircle: "var(--gray-700)",
  stroke: 15,
  speed: 60,
  cut: 0,
  rotation: 90,
  animationOff: false,
  fill: "none",
  inverse: true,
  round: true,
  number: false,
  linearGradient: ["var(--pink-300)", "var(--pink-700)"],
};

const percentage = 25;

export default function TeamReport() {
  return (
    <div className="mt-[16px] flex w-full min-w-[343px] justify-between gap-3 rounded-xl bg-gray-800 p-6">
      <div className="flex items-center justify-between gap-[40px]">
        <div className="relative w-[130px] tablet:w-[180px]">
          <CircularProgressBar id={1} percent={percentage} {...props} />
          <div className="absolute bottom-[30%] right-[32%] tablet:hidden">
            <p className="text-center text-xs">오늘</p>
            <p className="bg-gradient-to-r from-pink-700 to-pink-300 bg-clip-text text-xl font-bold text-transparent">
              {percentage}%
            </p>
          </div>
        </div>
        <div className="hidden text-white tablet:block">
          오늘의 <p>진행상황</p>
          <p className="bg-gradient-to-r from-pink-700 to-pink-300 bg-clip-text text-[40px] font-bold text-transparent">
            {percentage}%
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-4 tablet:w-[280px] desktop:w-[400px]">
        <div className="flex justify-between gap-2 rounded-xl bg-gray-700 p-3">
          <div>
            <p className="text-xs text-gray-300">오늘의 할 일</p>
            <p className="text-2xl font-bold text-pink-300">20개</p>
          </div>
          <Image src="/assets/images/img-todo.svg" alt="" width={40} height={40} />
        </div>
        <div className="flex justify-between gap-2 rounded-xl bg-gray-700 p-3">
          <div>
            <p className="text-xs text-gray-300">완료한 일</p>
            <p className="text-2xl font-bold text-pink-300">5개</p>
          </div>
          <Image src="/assets/images/img-done.svg" alt="" width={40} height={40} />
        </div>
      </div>
    </div>
  );
}
