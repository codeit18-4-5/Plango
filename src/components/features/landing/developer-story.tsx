"use client";

import cn from "@/lib/cn";
import { useState, useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "motion/react";
import { Code2, Sparkles, Rocket, Layers } from "lucide-react";
import { Container } from "@/components/layout";
import { SectionHeader } from "./layout";
import { CARD_WRAPPER_STYLES } from "@/components/ui/card/index.styles";
import Image from "next/image";
import IcQuotes from "@/assets/landing/ic-quotes.svg";

const developerReviews = [
  {
    name: "소현",
    role: "Front-end Lead",
    avatar: "/assets/landing/img-avatar-4.jpeg",
    review: "내용",
  },
  {
    name: "루리",
    role: "Front-end Developer",
    avatar: "/assets/landing/img-avatar-4.jpeg",
    review: "내용",
  },
  {
    name: "세진",
    role: "Front-end Developer",
    avatar: "/assets/landing/img-avatar-4.jpeg",
    review: "내용",
  },
  {
    name: "연수",
    role: "Front-end Developer",
    avatar: "/assets/landing/img-avatar-4.jpeg",
    review:
      "Plango 자유게시판은 사용자들이 모여 자연스럽게 교류할 수 있는 공간으로 확장되기를 고민했습니다. 복잡한 절차 없이 링크 하나로 팀에 참여할 수 있는 초대 버튼 기능을 게시판에 추가 도입하고, 좋아요 버튼에 서버 지연의 영향을 받지 않도록 낙관적 업데이트를 적용해 개선함으로써 게시판의 참여 속도와 체감을 높였습니다.",
  },
];

const floatingIcons = [
  { Icon: Code2, color: "text-pink-400" },
  { Icon: Rocket, color: "text-violet-400" },
  { Icon: Sparkles, color: "text-cyan-400" },
  { Icon: Layers, color: "text-emerald-400" },
];

function DeveloperCard({ dev }: { dev: (typeof developerReviews)[0] }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [15, -15]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-15, 15]), {
    stiffness: 300,
    damping: 30,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      className="group relative"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => setIsExpanded(!isExpanded)}
      style={{ perspective: 1000 }}
    >
      <motion.div
        className={cn(CARD_WRAPPER_STYLES.wrapper(true), "h-full")}
        style={{
          rotateX: isExpanded ? 0 : rotateX,
          rotateY: isExpanded ? 0 : rotateY,
        }}
        whileHover={{ scale: 1.02 }}
      >
        <div
          className={cn(CARD_WRAPPER_STYLES.inner, "grid h-full gap-[20px]", "tablet:gap-[24px]")}
        >
          <IcQuotes className={cn("h-[20px] w-[20px]", "tablet:h-[24px] tablet:w-[24px]")} />
          <p>{dev.review}</p>
          <div className="flex items-center gap-x-[12px]">
            <Image
              src={dev.avatar}
              alt={`${dev.name} avatar`}
              width={36}
              height={36}
              className={cn("rounded-full", "tablet:h-[48px] tablet:w-[48px]")}
            />

            <div className={cn("text-[12px]", "tablet:text-[14px]")}>
              <span>{dev.name}</span>
              <span className="block text-gray-400">{dev.role}</span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function DeveloperStory() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);

  return (
    <section
      ref={sectionRef}
      className={cn("relative min-h-screen p-[70px_0] text-center", "tablet:p-[110px_0]")}
    >
      <Container className="relative z-10">
        <motion.div
          className={cn(
            "via-pink-500/20 border-white/10 mb-[20px] inline-flex items-center rounded-full border bg-gradient-to-r from-purple-500/20 to-cyan-500/20 p-[5px_15px] backdrop-blur-lg",
            "tablet:mb-[30px] tablet:p-[10px_25px]",
          )}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <span className="text-body-l text-purple-200">Plango Story</span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <SectionHeader
            title="함께하는 문화를 만드는"
            gradientTitle="Plango 개발 스토리"
            gradientColor="linear-gradient(90deg, var(--pink-400), var(--purple-400))"
            description="Plango의 핵심 기능들은 이렇게 탄생했어요"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className={cn(
            "grid grid-cols-1 gap-[16px] text-left",
            "tablet:grid-cols-2 tablet:gap-[16px]",
            "desktop:gap-[20px]",
          )}
        >
          {developerReviews.map((dev, index) => (
            <DeveloperCard key={index} dev={dev} />
          ))}
        </motion.div>
      </Container>
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {floatingIcons.map((item, i) => (
          <motion.div
            key={i}
            className={`absolute ${item.color}`}
            style={{
              left: `${10 + i * 25}%`,
              top: `${i % 2 === 0 ? 10 : 20}%`,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 360],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <item.Icon size={40} strokeWidth={1} className="tablet:h-[60px] tablet:w-[60px]" />
          </motion.div>
        ))}
        <motion.div
          className="absolute inset-[-90px_0px]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
            y,
          }}
        />
      </div>
    </section>
  );
}
