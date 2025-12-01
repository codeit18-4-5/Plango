"use client";
import Visual from "@/assets/landing/visual-banner.svg";
import Logo from "@/assets/landing/logo-flat.svg";
import cn from "@/lib/cn";
import { Button } from "@/components/ui";
import { introContainer, introWave, introWaveWrapper } from "./landing.style";
import { motion } from "motion/react";

export default function IntroBanner() {
  return (
    <section className="bg-background">
      <div className={cn(introContainer)}>
        <h2 className="text-2xl text-pink-50 tablet:text-4xl">
          함께 계획하고 완성하는{" "}
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
        </h2>
        <Logo className={cn("h-8 tablet:h-16")} />
        <p className="break-keep pt-2 text-sm leading-relaxed text-pink-100 tablet:text-xl">
          혼자서는 힘들었던 목표, 이제 친구들과 함께 재밌게! <br />
          루틴부터 여행 계획까지, 모두 함께 완성해가는 공간
        </p>
      </div>
      <Button shape="round" full className="cta-btn">
        지금 시작하기
      </Button>
      <div className={introWaveWrapper}>
        <Visual className="mx-auto h-auto w-[150%] max-w-[1200px] -translate-x-[15%] tablet:w-full tablet:translate-x-0" />
        <div className={cn("wave", introWave)}></div>
        <div className={cn("wave2", introWave)}></div>
      </div>
    </section>
  );
}
