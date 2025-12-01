"use client";

import cn from "@/lib/cn";
import { motion } from "motion/react";
import { Container } from "@/components/layout";
import { Button } from "@/components/ui";
import { SectionHeader } from "./layout";
import IcPlangoCharacter from "@/assets/landing/ic-plango-character.svg";

export default function Footer() {
  return (
    <>
      <section className={cn("relative p-[20px_0]", "tablet:p-[30px_0]")}>
        <Container>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <SectionHeader
              title="떠오르는 계획이 있나요?"
              gradientTitle="오늘 하루 Plango와 함께!"
              gradientColor="linear-gradient(90deg, var(--pink-200), var(--pink-400))"
              description="혼자가 아닌 함께, 작심삼일이 아닌 꾸준함"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <IcPlangoCharacter
              className={cn(
                "m-auto max-h-[122px] w-full max-w-[300px]",
                "tablet:max-h-[276px] tablet:max-w-[700px]",
              )}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Button as={"a"} href={"/article"} shape="round" full className="cta-btn">
              지금 둘러보기
            </Button>
          </motion.div>
        </Container>
      </section>
      <footer className="py-6 text-center">
        <p className={cn("text-[12px] text-gray-500", "tablet:text-[14px]")}>
          copyright © 2025 Codeit Plango. All rights reserved.
        </p>
      </footer>
    </>
  );
}
