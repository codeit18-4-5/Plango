import cn from "@/lib/cn";
import {
  progressbar,
  sectionContentBox,
  sectionContentTitle,
  sectionDescription,
  sectionInnerContainer,
  sectionTitle,
  sectionTitleGradient,
  sectionWrapper,
} from "./landing.style";
import IcDone from "@/assets/icons/ic-done.svg";
import { motion } from "motion/react";

type Color = "orange" | "blue" | "green" | "purple";
type ContentValueType = {
  icon: string;
  description: string;
  theme: string;
  solution: string;
  solution2: string;
  color: Color;
  percent: number;
  checkList: string[];
}[];
const values: ContentValueType = [
  {
    icon: "🎯",
    description: "같은 목표를 가진 친구들과 함께!",
    theme: "🏃 러닝 크루",
    solution: "같이뛰면 포기 안해요",
    solution2: "작심삼일을 뛰어넘도록 도와주는 러닝 크루 경험",
    color: "orange",
    percent: 80,
    checkList: ["매일 러닝 인증", "서로 응원 댓글", "월말 기록 공유"],
  },
  {
    icon: "✈️",
    description: "일상, 여행, 취미 등 자유롭게!",
    theme: "📋 여행 계획",
    solution: "친구들과 완벽한 여행",
    solution2: "일정 나누기부터 체크리스트까지 한 곳에서",
    color: "blue",
    percent: 73,
    checkList: ["일정 함께 짜기", "체크리스트 관리", "가고 싶은곳 공유"],
  },
  {
    icon: "💪",
    description: "서로 응원하며 꾸준히!",
    theme: "📚 스터디",
    solution: "함께 공부하면 집중 돼요",
    solution2: "스터디 기록이 쌓일수록 동기부여 UP",
    color: "green",
    percent: 85,
    checkList: ["공부 인증샷", "서로 질문 답변", "주차별 목표 설정"],
  },
  {
    icon: "🎉",
    description: "함께 성장하고 완성해요!",
    theme: "🎨 취미 활동",
    solution: "취미도 같이하면 재미도 두배",
    solution2: "같이 성장하는 소소한 루틴 만들기",
    color: "purple",
    percent: 91,
    checkList: ["취미 작품 공유", "주말 카페 투어", "모임 일정 공유"],
  },
];
type ProgressbarProps = {
  color: Color;
  percent: number;
};
type ChecklistProps = {
  color: Color;
  checkList: string[];
};

function SectionH3() {
  return (
    <h3 className={cn(sectionTitle)}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        🪴
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="pt-2"
      >
        Plango에서
      </motion.div>
      <motion.div
        className={cn(
          "inline-block pt-2 tablet:pt-4",
          sectionTitleGradient({ color: "orangeGreen" }),
        )}
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.9, type: "spring", stiffness: 200 }}
      >
        친구들과 이런 걸 함께해요
      </motion.div>
    </h3>
  );
}
function SectionH4() {
  return (
    <h4 className={cn(sectionDescription)}>
      <motion.span
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        다양한 활동들을 함께해요 <br />
        운동, 여행, 공부, 취미 뭐든지 함께하면 더 즐거워져요
      </motion.span>
    </h4>
  );
}
function Progressbar({ color, percent }: ProgressbarProps) {
  return (
    <div className="flex flex-1 items-center gap-2">
      <div className={cn(progressbar({ gradient: color }))}></div>
      <span className={cn(`text-${color}-200 text-base font-bold`)}>{percent}%</span>
    </div>
  );
}
function CheckList({ color, checkList }: ChecklistProps) {
  return (
    <ul className="flex flex-col gap-2">
      {checkList.map((v, index) => {
        return (
          <motion.li
            key={index}
            className="flex cursor-pointer flex-nowrap items-center gap-2 text-sm text-gray-200 tablet:text-base"
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{
              delay: 1 + index * 0.1,
              type: "spring",
              stiffness: 100,
            }}
            whileHover={{ scale: 1.1 }}
          >
            <span className={cn(`text-${color}-200 flex-shrink-0`)}>
              <IcDone />
            </span>
            {v}
          </motion.li>
        );
      })}
    </ul>
  );
}
function SolutionList() {
  return (
    <ul className={cn(sectionInnerContainer({ layout: "solution" }))}>
      {values.map((v, index) => {
        const { icon, theme, description, solution2, solution, color, percent, checkList } = v;
        return (
          <motion.li
            key={theme}
            className="zigzag flex flex-col justify-between gap-6 tablet:flex-row"
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{
              delay: 0.5 + index * 0.1,
              type: "spring",
              stiffness: 20,
            }}
          >
            <div className={cn(sectionContentTitle({ theme: "solution" }))}>
              <span>{icon}</span>
              {description}
            </div>

            <div className={cn(sectionContentBox({ color, layout: "solution" }))}>
              <div>
                <p className={cn(sectionContentTitle({ theme: "solution" }))}>{theme}</p>
                <p className={cn(`text-${color}-200`, "mt-4 text-sm")}>{solution}</p>
                <p className={cn(`text-${color}-200`, "mt-1 text-sm")}>{solution2}</p>
              </div>
              <div className="flex flex-nowrap gap-6">
                <Progressbar color={color} percent={percent} />
                <CheckList color={color} checkList={checkList} />
              </div>
            </div>
          </motion.li>
        );
      })}
    </ul>
  );
}

export default function SolutionSection() {
  return (
    <section className={cn(sectionWrapper)}>
      <SectionH3 />
      <SectionH4 />
      <SolutionList />
    </section>
  );
}
