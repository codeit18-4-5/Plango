"use client";

import cn from "@/lib/cn";
import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useInView } from "motion/react";
import { Container } from "@/components/layout";
import { BestArticleSection } from "@/components/features/article";
import { SectionHeader } from "./layout";

const generateFloatingHearts = (count: number) => {
  return Array.from({ length: count }, (_, i) => {
    return {
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 3 + Math.random() * 2,
      size: 1.5 + Math.random() * 2,
      emoji: ["✈️", "📚", "🏃🏻", "💕", "👍🏻", "🎹"][Math.floor(Math.random() * 6)],
      swayAmount: 20 + Math.random() * 40,
      swayDuration: 2 + Math.random() * 2,
    };
  });
};

export default function PopularPosts() {
  const [showFloatingHearts, setShowFloatingHearts] = useState(false);
  const [floatingHeartsData] = useState(() => generateFloatingHearts(35));
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { amount: 0.25, once: false });

  useEffect(() => {
    if (isInView && !showFloatingHearts) {
      setShowFloatingHearts(true);
      const timer = setTimeout(() => {
        setShowFloatingHearts(false);
      }, 7000);
      return () => clearTimeout(timer);
    }
  }, [isInView, showFloatingHearts]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);

  return (
    <section ref={sectionRef} className={cn("relative p-[70px_0]", "tablet:p-[110px_0]")}>
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ opacity, scale, y }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <SectionHeader
              title="지금 가장 주목받는"
              gradientTitle="베스트 게시글"
              gradientColor="linear-gradient(90deg, var(--purple-400), var(--pink-600))"
              description="Plango 멤버들이 가장 관심 있어하는 토픽이에요"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <BestArticleSection showTitle={false} />
          </motion.div>
        </motion.div>
      </Container>
      {showFloatingHearts && (
        <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
          {floatingHeartsData.map(heart => (
            <motion.div
              key={heart.id}
              className="absolute"
              style={{
                left: `${heart.left}%`,
                fontSize: `${heart.size}rem`,
              }}
              initial={{
                bottom: "-10%",
                opacity: 0,
                scale: 0.5,
              }}
              animate={{
                bottom: "110%",
                opacity: [0, 1, 1, 0.8, 0],
                scale: [0.5, 1, 1, 0.8],
                x: [
                  0,
                  heart.swayAmount,
                  -heart.swayAmount,
                  heart.swayAmount / 2,
                  -heart.swayAmount / 2,
                  0,
                ],
              }}
              transition={{
                duration: heart.duration,
                delay: 1 + heart.delay,
                ease: "easeOut",
                x: {
                  duration: heart.swayDuration,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
            >
              {heart.emoji}
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}
