"use client";
import { Container } from "@/components/layout";
import IntroBanner from "@/components/features/landing/intro-section";
import ProblemSection from "@/components/features/landing/problem-section";
import SolutionSection from "@/components/features/landing/solution-section";
import DailySummarySection from "@/components/features/landing/daily-summary-section";
import WhyPlangoSection from "@/components/features/landing/why-plango-section";
export default function Landing() {
  return (
    <div className="bg-gradient-to-b from-[#091014] to-background">
      <IntroBanner />
      <Container className="max-w-[1440px] px-[1.25rem] pt-0 tablet:px-6">
        <ProblemSection />
        <WhyPlangoSection />
        <SolutionSection />
        <DailySummarySection />
      </Container>
    </div>
  );
}
