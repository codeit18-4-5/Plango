import cn from "@/lib/cn";
import {
  sectionContentBox,
  sectionDescription,
  sectionInnerContainer,
  sectionTitle,
  sectionTitleGradient,
  sectionWrapper,
} from "./landing.style";

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
        <h3
          className={cn(
            sectionTitle,
            sectionTitleGradient({ color: "pinkYellow" }),
            "!leading-normal",
          )}
        >
          Plango가 준비했어요 ✨
        </h3>

        <div className={cn(sectionDescription, "tablet:mt-10")}>
          다같이 꾸준히 이어가기 위한 공간 <br />
          혼자서는 어렵지만, <br className="mobile:hidden" />
          <span className="text-pink-300">함께라면 달라져요</span> 💪
        </div>
        <ul className="mt-10 flex flex-col gap-8">
          {values.map((v, index) => (
            <li
              key={index}
              className={cn(
                sectionContentBox({ color: "pink", layout: "whyPlango" }),
                "text-base text-gray-100",
              )}
            >
              {v}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
