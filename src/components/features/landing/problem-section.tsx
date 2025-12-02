import cn from "@/lib/cn";
import {
  sectionContentBox,
  sectionContentTitle,
  sectionInnerContainer,
  sectionTitle,
  sectionTitleGradient,
  sectionWrapper,
} from "./landing.style";
import { motion } from "motion/react";

const values = [
  {
    icon: "📊",
    title: "업무 중심 도구",
    description: "딱딱한 업무용 툴은 일상 속 작은 목표에 어울리지 않아요.",
    solution: "“가벼운 일정은 가볍게 기록하고 싶잖아요?”",
  },
  {
    icon: "😔",
    title: "동기부여 부족",
    description: "혼자서는 목표를 유지하기 어려워요",
    solution: "“함께하면 더 잘할 수 있을 것 같은데...”",
  },
  {
    icon: "🤷",
    title: "일정 공유 누락",
    description: "친구들과 계획 체크리스트를 공유하고 싶어요",
    solution: "“카톡에 흩어진 체크리스트, 결국 아무도 기억 못 하죠”",
  },
];

export default function ProblemSection() {
  return (
    <section className={cn(sectionWrapper, "bg-[#091014]")}>
      <motion.div
        variants={{
          show: {
            transition: {
              staggerChildren: 0.12,
            },
          },
        }}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <motion.h3
          className={cn(sectionTitle)}
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          🤔
          <span className={cn("pl-2", sectionTitleGradient({ color: "orangeRose" }))}>
            이런 고민 있으신가요?
          </span>
        </motion.h3>
      </motion.div>
      <motion.ul
        className={cn(sectionInnerContainer({ layout: "problem" }))}
        variants={{
          show: {
            transition: { staggerChildren: 0.7 },
          },
        }}
        initial="hidden"
        whileInView="show"
      >
        {values.map((v, index) => {
          const { icon, title, description, solution } = v;
          const isOdd = index % 2 === 0;
          return (
            <motion.li
              key={title}
              className={cn(sectionContentBox({ color: "gray", layout: "problem" }))}
              initial={{ opacity: 0, x: isOdd ? -80 : 80, y: 20 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h4 className={cn(sectionContentTitle({ theme: "problem" }))}>
                <span className="inline-block pb-2">{icon}</span> <br />
                {title}
              </h4>
              <p className="break-keep text-sm text-gray-400">{description}</p>
              <p className="break-keep text-sm text-gray-400">{solution}</p>
            </motion.li>
          );
        })}
      </motion.ul>
    </section>
  );
}
