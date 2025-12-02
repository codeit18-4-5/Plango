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
    avatar: "/assets/landing/img-avatar-1.jpg",
    review: `PLANGO에서 로그인 → 히스토리 → 프로필 관리까지, 유저의 주요 흐름을 담당한 만큼 "사용하기 편하다" 라고 느낄 수 있도록 고민하며 작업했습니다. 로그인을 반복해야 하는 불편함을 줄이기 위해 로그인 유지 기능을 구현했고, 보안을 위해 핵심 토큰은 httpOnly 쿠키로 안전하게 관리했습니다. 마이히스토리는 데이터가 많아져도 빠르게 확인할 수 있도록 SSR과 CSR을 적절히 나누어 처리하고, 실패시 재시도 기능을 넣어 이탈률을 최소화했습니다. 또한 프로필 사진도 업로드 후 바로 취소할 수 있어 부담 없이 여러 번 시도할 수 있도록 편의성을 높였습니다`,
  },
  {
    name: "루리",
    role: "Front-end Developer",
    avatar: "/assets/landing/img-avatar-2.jpg",
    review:
      "Plango의 할일 페이지를 개발하였습니다. 초기 로딩속도를 줄이기위해서 SSR기능을 적용하였고, 따라서 할일리스트에서 첫페이지의 데이터를 가져올때 SSR, CSR로  나누어서 데이터를 가져오도록  했습니다. 그리고 provider로 context를 공유하는등 컴포넌트간의 데이터 드릴링을 막기위해서 provider를 적용하였습니다. 그리고 처음으로 가장 신경썼던게 Alert인데요. 모든 화면과 다양한 상황에서 즉시 사용 가능한 기본형을 제공하는 동시에, 디자인 및 로직 변경에 쉽게 대응할 수 있는 커스텀 옵션을 지원하도록 설계했습니다",
  },
  {
    name: "세진",
    role: "Front-end Developer",
    avatar: "/assets/landing/img-avatar-3.jpg",
    review:
      "Plango의 gnb와 팀 페이지를 담당했습니다! 각자 팀마다 그래프를 통해 오늘의 달성률을 한눈에 볼 수 있다는것이 매력적이라고 생각합니다. 자유롭게 팀 생성 및 참여가 가능하고 팀 페이지 내에서 멤버관리, 할 일 목록 관리를 간단하게 할 수 있습니다. GNB를 처음 구현해보았는데 사용자 정보와, 그에 따라 달라지는 데이터를 관리하는 부분이라 SSR과 CSR을 조합하여 구성하였습니다.",
  },
  {
    name: "연수",
    role: "Front-end Developer",
    avatar: "/assets/landing/img-avatar-4.jpeg",
    review:
      "Plango 자유게시판은 사람들이 모여 이야기를 나누고 작은 교류가 하나의 문화로 이어지는 공간이 되기를 바랐습니다. 버튼 하나로 팀에 참여할 수 있는 초대 기능을 게시판에 추가 도입하고, 사용자에게 빠른 피드백을 반영하기 위해 낙관적 업데이트를 적용해 서버 지연이 발생하더라도 즉시 반응이 가능하도록 개선함으로써 게시판의 참여 속도와 사용자 경험을 최적화했습니다.",
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
      className={cn("relative p-[70px_0] text-center", "tablet:p-[110px_0]")}
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
            className={`absolute opacity-20 ${item.color}`}
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
