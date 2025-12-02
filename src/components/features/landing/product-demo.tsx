"use client";

import cn from "@/lib/cn";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";
import { Container } from "@/components/layout";
import { SectionHeader } from "./layout";
import { CircularProgressBar } from "@tomickigrzegorz/react-circular-progress-bar";
import { reportChartProps } from "@/components/features/team/team.props";
import { formatDateToFullStr } from "@/lib/utils";
import IcDone from "@/assets/icons/ic-done-type2.svg";
import IcTodo from "@/assets/icons/ic-todo.svg";
import IcCheck from "@/assets/icons/ic-check.svg";
import IcCalendar from "@/assets/icons/ic-calendar.svg";
import IcRepeat from "@/assets/icons/ic-repeat.svg";

const mockTasks = [
  {
    id: 1,
    title: "팀 회고 작성하기",
    completed: true,
    frequencyType: "매주 반복",
  },
  {
    id: 2,
    title: "데일리 스크럼/회의록 작성하기",
    completed: true,
    frequencyType: "매일 반복",
  },
  {
    id: 3,
    title: "발표자료 준비하기",
    completed: false,
    frequencyType: "한 번",
  },
];

const DATE = new Date();

export default function ProductDemo() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [tasks, setTasks] = useState(mockTasks);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.7, 1, 0.7]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [15, 0, -15]);

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => (task.id === id ? { ...task, completed: !task.completed } : task)));
  };

  return (
    <section ref={sectionRef} className={cn("relative p-[40px_0_70px]", "tablet:p-[60px_0_110px]")}>
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <SectionHeader
              title="함께 만드는 투두리스트"
              gradientTitle="지금 시작해보세요!"
              gradientColor="linear-gradient(90deg, var(--pink-400), var(--purple-400))"
              description="투두리스트 기능을 체험해보세요"
            />
          </motion.div>
        </motion.div>

        <motion.div style={{ scale, rotateX }} className="perspective-1000 mx-auto max-w-[1000px]">
          <div
            className={cn(
              "relative grid gap-y-[20px] rounded-[12px] border border-gray-700 bg-gray-800 p-[24px_16px]",
              "tablet:gap-y-[30px] tablet:p-[32px_32px]",
            )}
          >
            <div className="text-heading-s">5팀 리포트 🦩</div>
            <div className={cn("grid grid-cols-2 items-center justify-between gap-x-[20px]")}>
              <div
                className={cn(
                  "relative flex max-w-[140px] items-center gap-x-[0px]",
                  "tablet:max-w-[initial] tablet:gap-x-[20px]",
                )}
              >
                <div className={cn("w-full", "tablet:w-[140px]")}>
                  <CircularProgressBar
                    id={1}
                    percent={
                      tasks.length === 0
                        ? 0
                        : Math.round((tasks.filter(t => t.completed).length / tasks.length) * 100)
                    }
                    {...reportChartProps}
                  />
                </div>
                <div
                  className={cn(
                    "absolute grid w-full gap-[4px] text-center",
                    "tablet:relative tablet:w-auto tablet:text-left",
                  )}
                >
                  <b className={cn("hidden text-body-m font-normal leading-[1.3]", "tablet:block")}>
                    오늘의
                    <br />
                    진행 상황
                  </b>
                  <strong
                    className={cn(
                      "bg-[linear-gradient(90deg,var(--pink-700),var(--pink-400))] bg-clip-text text-[28px] text-transparent",
                      "tablet:text-[40px]",
                    )}
                  >
                    {tasks.length === 0
                      ? 0
                      : Math.round((tasks.filter(t => t.completed).length / tasks.length) * 100)}
                    %
                  </strong>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between rounded-[12px] bg-gray-700 p-[15px_20px]">
                  <span className="grid gap-[4px]">
                    <span className="text-m text-gray-300">오늘의 할 일</span>
                    <b className={cn("text-[16px] text-pink-300", "tablet:text-[24px]")}>
                      {tasks.length}개
                    </b>
                  </span>
                  <IcTodo className="h-[40px] w-[40px]" />
                </div>
                <div className="flex items-center justify-between rounded-[12px] bg-gray-700 p-[15px_20px]">
                  <span className="grid gap-[4px]">
                    <span className="text-m text-gray-300">한 일</span>
                    <b className={cn("text-[16px] text-pink-300", "tablet:text-[24px]")}>
                      {tasks.filter(t => t.completed).length}개
                    </b>
                  </span>
                  <IcDone className="h-[40px] w-[40px]" />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {tasks.map(task => (
                <motion.div key={task.id} className="relative">
                  <div
                    className={cn(
                      "grid cursor-pointer gap-y-[10px] rounded-[12px] border border-gray-600 p-4 transition-all",
                      "hover:-translate-x-[0px] hover:border-pink-400",
                      "tablet:hover:-translate-x-[-15px]",
                    )}
                    onClick={() => toggleTask(task.id)}
                  >
                    <div className="flex items-center gap-[10px]">
                      <motion.div
                        whileTap={{ scale: 0.9 }}
                        className={`flex h-[20px] w-[20px] items-center justify-center rounded-[6px] border ${
                          task.completed ? "border-pink-300 bg-pink-300" : "border-white/30"
                        }`}
                      >
                        {task.completed && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                          >
                            <IcCheck className="h-4 w-4" />
                          </motion.div>
                        )}
                      </motion.div>

                      <p className={cn(`text-[14px] ${task.completed ? "line-through" : ""}`)}>
                        {task.title}
                      </p>
                    </div>
                    <div className="flex items-center text-[12px] text-gray-500">
                      <IcCalendar className="mr-1 inline-block h-[16px] w-[16px]" />
                      {formatDateToFullStr({ date: DATE, type: "korean" })}
                      <IcRepeat className="ml-4 mr-1 inline-block h-[16px] w-[16px]" />
                      {task.frequencyType}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
