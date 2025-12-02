import cn from "@/lib/cn";
import {
  sectionContentBox,
  sectionDescription,
  sectionInnerContainer,
  sectionTitle,
  sectionTitleGradient,
  sectionWrapper,
} from "./landing.style";
import { motion } from "motion/react";

const values = [
  "🧑‍🤝‍🧑 같은 목표를 가진 친구들과",
  "💫 함께 계획하고 함께 이루어내고",
  "🌱 작지만 확실한 성장의 순간들",
  "🚀 가볍게 시작하고, 꾸준히 이어가는 힘",
];
export default function WhyPlangoSection() {
  return (
    <section className={cn(sectionWrapper)}>
      <div className={cn(sectionInnerContainer({ layout: "whyPlango" }))}>
        <motion.h3
          className={cn(
            sectionTitle,
            sectionTitleGradient({ color: "pinkYellow" }),
            "!leading-normal",
          )}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          Plango가 준비했어요
          <motion.span
            animate={{
              opacity: [1, 0.6, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="text-pink-300"
          >
            ✨
          </motion.span>
        </motion.h3>

        <div className={cn(sectionDescription, "tablet:mt-10")}>
          다같이 꾸준히 이어가기 위한 공간 <br />
          혼자서는 어렵지만, <br className="mobile:hidden" />
          <motion.span className="text-pink-300">함께라면 달라져요</motion.span> 💪
        </div>
        <motion.ul
          className="mt-10 flex flex-col gap-8"
          variants={{
            show: {
              transition: { staggerChildren: 1 },
            },
          }}
          initial="hidden"
          whileInView="show"
        >
          {values.map((v, index) => (
            <motion.li
              key={index}
              className={cn(
                sectionContentBox({ color: "pink", layout: "whyPlango" }),
                "text-base text-gray-100",
              )}
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              {v}
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
