"use client";
import Link from "next/link";
import { Container } from "@/components/layout";
import { TeamTitle, TaskList, TeamMember, TeamReport } from "@/components/features/team";

export default function TeamPages() {
  return (
    <Container>
      <TeamTitle />
      <section className="mb-[48px] desktop:mb-[64px]">
        <div className="flex justify-between">
          <div className="flex gap-2">
            <h3 className="inline-block text-[16px]">할 일 목록</h3>
            <span className="text-[16px] text-gray-500">(4개)</span>
          </div>
          <Link href="/" className="text-sm text-pink-400">
            + 새로운 목록 추가하기
          </Link>
        </div>
        <TaskList />
      </section>
      <section className="mb-[48px] desktop:mb-[64px]">
        <h3 className="text-[16px]">리포트</h3>
        <TeamReport />
      </section>
      <section className="mb-[48px] desktop:mb-[64px]">
        <div className="flex justify-between">
          <div className="flex gap-2">
            <h3 className="inline-block text-[16px]">멤버</h3>
            <span className="text-[16px] text-gray-500">(6명)</span>
          </div>
          <Link href="/" className="text-sm text-pink-400">
            + 새로운 멤버 초대하기
          </Link>
        </div>
        <div className="mt-[16px] grid w-full grid-cols-2 gap-[16px] tablet:grid-cols-3 tablet:gap-[24px]">
          <TeamMember />
        </div>
      </section>
    </Container>
  );
}
