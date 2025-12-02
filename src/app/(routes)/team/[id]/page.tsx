import { notFound } from "next/navigation";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getGroupTaskListsforServer } from "@/api/tasklist/index-server";
import TeamClientPages from "./team-client";

export const dynamic = "force-dynamic";

export default async function TeamPages({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const groupId = Number(id);
  const queryClient = new QueryClient();
  const groupData = await getGroupTaskListsforServer(groupId);

  if (!groupData) {
    notFound();
  }
  //getusergroups도 ssr api 만들어서 여기서 조회해서 넘겨.

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TeamClientPages groupId={groupId} groups={groupData} />
    </HydrationBoundary>
  );
}
