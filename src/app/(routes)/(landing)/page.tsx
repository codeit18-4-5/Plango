"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import {
  IntroBanner,
  ProblemSection,
  SolutionSection,
  DailySummarySection,
  WhyPlangoSection,
  PopularPosts,
  DeveloperStory,
  ProductDemo,
  Footer,
} from "@/components/features/landing";

const sectionBackgrounds = [
  "var(--gray-900)",
  "#091014",
  "linear-gradient(to bottom, #091014 90%, var(--gray-900))",
  "var(--gray-900)",
  "var(--gray-900)",
  "var(--gray-900)",
  "var(--gray-900)",
  "linear-gradient(45deg, var(--gray-900), var(--gray-800))",
];

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollTop / scrollHeight;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getCurrentBackground = () => {
    const sectionCount = sectionBackgrounds.length;
    const sectionProgress = scrollProgress * (sectionCount - 1);
    const currentSectionIndex = Math.floor(sectionProgress);
    const nextSectionIndex = Math.min(currentSectionIndex + 1, sectionCount - 1);
    const sectionBlend = sectionProgress - currentSectionIndex;

    return {
      current: sectionBackgrounds[currentSectionIndex],
      next: sectionBackgrounds[nextSectionIndex],
      blend: sectionBlend,
    };
  };

  const { current, next, blend } = getCurrentBackground();

  return (
    <>
      <motion.div
        className="fixed inset-0 z-0"
        style={{
          background: current,
        }}
        animate={{
          opacity: 1 - blend,
        }}
        transition={{ duration: 0 }}
      />
      <motion.div
        className="fixed inset-0 z-0"
        style={{
          background: next,
        }}
        animate={{
          opacity: blend,
        }}
        transition={{ duration: 0 }}
      />

      <div ref={containerRef} className="relative" style={{ scrollBehavior: "smooth" }}>
        <IntroBanner />
        <ProblemSection />
        <WhyPlangoSection />
        <SolutionSection />
        <DailySummarySection />
        <DeveloperStory />
        <PopularPosts />
        <ProductDemo />
        <Footer />
      </div>
    </>
  );
}
