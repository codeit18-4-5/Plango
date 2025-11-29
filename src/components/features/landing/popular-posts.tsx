"use client";

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
      size: 1.5 + Math.random() * 1.8,
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
  const isInView = useInView(sectionRef, { amount: 0.1, once: false });

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
    <div ref={sectionRef} className="relative min-h-screen">
      <Container as="section">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ opacity, scale, y }}
        >
          <SectionHeader
            title="지금 가장 주목받는"
            gradientTitle="베스트 게시글"
            gradientColor="linear-gradient(90deg, var(--pink-400), var(--purple-400))"
            description="Plango 멤버들이 가장 관심 있어하는 토픽이에요"
          />
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-20 text-center"
          >
            <BestArticleSection showTitle={false} />
          </motion.div>
        </motion.div>
      </Container>
      {showFloatingHearts && (
        <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
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
                delay: heart.delay,
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
    </div>
  );
}
