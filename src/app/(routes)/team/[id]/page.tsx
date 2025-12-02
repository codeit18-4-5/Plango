import { notFound } from "next/navigation";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getGroupTaskListsforServer } from "@/api/tasklist/index-server";
import getSSRUserGroups from "@/api/team/get-ssr-user-groups";
import getSSRUser from "@/api/user/get-ssr-user";
import TeamClientPages from "./team-client";

export default async function TeamPages({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const groupId = Number(id);
  const queryClient = new QueryClient();

  const groupData = await getGroupTaskListsforServer(groupId);
  const userGroup = await getSSRUserGroups();
  const user = await getSSRUser();

  const isMember = userGroup.some(ug => ug.id === groupId);

  if (!groupData || !isMember) {
    notFound();
  }
  const memberList = user?.memberships?.filter(mb => mb.groupId === Number(groupId)) || [
    { role: "ADMIN" },
  ];

  queryClient.setQueryData(["getGroups", groupId], groupData);

  const userRole = memberList[0].role;

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TeamClientPages groupId={groupId} userRole={userRole} />
    </HydrationBoundary>
  );
}
