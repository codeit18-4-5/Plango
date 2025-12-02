"use client";
import Image from "next/image";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Container } from "@/components/layout";
import { Button } from "@/components/ui";
import { useQuery } from "@tanstack/react-query";
import getUserGroups from "@/api/team/get-user-groups";

export default function TeamPage() {
  const router = useRouter();

  const groups = useQuery({
    queryKey: ["userGroups"],
    queryFn: getUserGroups,
  });

  useEffect(() => {
    if (groups.data && groups.data.length > 0) {
      router.replace(`/team/${groups.data[0].id}`);
    }
  }, [groups?.data]);

  if (groups.isPending || (groups.data && groups.data.length > 0)) {
    return null;
  }

  return (
    <Container className="mt-[15vh] tablet:mt-[20vh]">
      <div className="relative h-[180px] w-full">
        <Image src="/assets/images/img-team.svg" alt="" fill />
      </div>
      <p className="mt-[32px] text-center text-gray-500 tablet:mt-[48px]">
        아직 소속된 팀이 없습니다. <br /> 팀을 생성하거나 팀에 참여해보세요.
      </p>
      <div className="mt-[48px] flex flex-col items-center gap-2 tablet:mt-[80px]">
        <Button intent="primary" className="h-[48px] w-[180px]" as="a" href="/team/create">
          팀 생성하기
        </Button>
        <Button intent="tertiary" className="h-[48px] w-[180px]" as="a" href="/team/join">
          팀 참여하기
        </Button>
      </div>
    </Container>
  );
}
