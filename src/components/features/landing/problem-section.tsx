import cn from "@/lib/cn";
import {
  sectionContentBox,
  sectionContentTitle,
  sectionInnerContainer,
  sectionTitle,
  sectionTitleGradient,
  sectionWrapper,
} from "./landing.style";

const values = [
  {
    icon: "📊",
    title: "업무 중심 도구",
    description: "딱딱한 업무용 툴은 일상 속 작은 목표에 어울리지 않아요.",
    solution: "“가벼운 일정은 가볍게 기록하고 싶잖아요?”",
  },
  {
    icon: "😔",
    title: "동기부여 부족",
    description: "혼자서는 목표를 유지하기 어려워요",
    solution: "“함께하면 더 잘할 수 있을 것 같은데...”",
  },
  {
    icon: "🤷",
    title: "일정 공유 누락",
    description: "친구들과 계획 체크리스트를 공유하고 싶어요",
    solution: "“카톡에 흩어져버린 체크리스트, 결국 아무도 기억 못 하죠”",
  },
];

export default function ProblemSection() {
  return (
    <section className={cn(sectionWrapper, "bg-[#091014]")}>
      <h3 className={cn(sectionTitle)}>
        🤔
        <span className={cn("pl-2", sectionTitleGradient({ color: "orangeRose" }))}>
          이런 고민 있으신가요?
        </span>
      </h3>
      <ul className={cn(sectionInnerContainer({ layout: "problem" }))}>
        {values.map(v => {
          const { icon, title, description, solution } = v;
          return (
            <li key={title} className={cn(sectionContentBox({ color: "gray", layout: "problem" }))}>
              <h4 className={cn(sectionContentTitle({ theme: "problem" }))}>
                <span className="inline-block pb-2">{icon}</span> <br />
                {title}
              </h4>
              <p className="break-keep text-sm text-gray-400">{description}</p>
              <p className="break-keep text-sm text-gray-400">{solution}</p>
            </li>
          );
        })}
        <li></li>
      </ul>
    </section>
  );
}
