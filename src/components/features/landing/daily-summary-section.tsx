import cn from "@/lib/cn";
import {
  sectionDescription,
  sectionInnerContainer,
  sectionTitle,
  sectionTitleGradient,
  sectionWrapper,
  summaryText,
} from "./landing.style";
import TodoList from "@/assets/landing/visual-todo-list.svg";
import { motion } from "motion/react";

export default function DailySummarySection() {
  return (
    <section className={cn(sectionWrapper)}>
      <div className={cn(sectionInnerContainer({ layout: "dailySummary" }))}>
        <div>
          <h3 className={cn(sectionTitle)}>
            <span className="leading-relaxed">🌙</span>
            <br />
            뿌듯한 마음으로 <br />
            <span
              className={cn(
                "inline-block pt-2 tablet:pt-3",
                sectionTitleGradient({ color: "purplePink" }),
              )}
            >
              하루를 마무리 하기
            </span>
          </h3>
          <ul className="mt-3 flex flex-col gap-4 tablet:mt-6">
            <li className={cn(sectionDescription, "!leading-relaxed")}>
              오늘 하루도 친구들과 함께 목표를 이뤘어요. <br />
              혼자였다면 불가능했을 일들을 <br />
              함께라서 해낼 수 있었어요!
            </li>
            <li className="hidden flex-col gap-3 text-center text-xs opacity-80 tablet:flex">
              <span>✦</span>
              <span>✦</span>
              <span>✦</span>
            </li>
            <li className={cn(summaryText)}>⭐️ 오늘의 기록이 쌓여 내일을 바꾸어요.</li>
            <li className={cn(summaryText)}>⭐️ 작은 루틴이 모여 큰 변화가 됩니다.</li>
          </ul>
        </div>
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ repeat: Infinity, duration: 5 }}
          className="max-h-[680px] w-auto"
        >
          <TodoList />
        </motion.div>
      </div>
    </section>
  );
}
