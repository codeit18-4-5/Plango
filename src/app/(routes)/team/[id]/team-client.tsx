"use client";
import { redirect } from "next/navigation";
import { useState, useEffect } from "react";
import { Container } from "@/components/layout";
import { GetGroupsResponse, TodoListProps } from "@/types/group";
import { Member } from "@/types/tasklist";
import { TeamTitle, TodoList, TeamMember, TeamReport } from "@/components/features/team";
import { useAuthStore } from "@/store/auth.store";
import { useToast } from "@/providers/toast-provider";
import TeamSkeleton from "@/components/skeleton-ui/team-skeleton";
import { useQuery } from "@tanstack/react-query";
import getGroups from "@/api/team/get-groups";

export default function TeamClientPages({
  groupId,
  userRole,
}: {
  groupId: number;
  userRole: string;
}) {
  const { showToast } = useToast();

  const user = useAuthStore(state => state.user);
  const initialized = useAuthStore(state => state.initialized);

  const [members, setMembers] = useState<Member[]>([]);
  const [todoLists, setTodoLists] = useState<TodoListProps>();

  const { data: groups } = useQuery<GetGroupsResponse, Error>({
    queryKey: ["getGroups", groupId],
    queryFn: () => getGroups(groupId),
  });

  useEffect(() => {
    setTimeout(() => {
      const teamJoinMessage = sessionStorage.getItem("teamJoinMessage");
      if (teamJoinMessage) {
        sessionStorage.removeItem("teamJoinMessage");
        showToast(teamJoinMessage, "success");
      }
    }, 150);
  }, [showToast]);

  useEffect(() => {
    if (groups) {
      setMembers(groups.members);
      setTodoLists({ groupId: groups.id, taskList: groups.taskLists });
    }
  }, [groups]);

  if (!initialized) {
    return <TeamSkeleton />;
  }

  if (!user) {
    redirect("/");
  }

  const { id: userId } = user;

  return (
    <Container>
      <TeamTitle name={groups?.name || ""} id={groups?.id || 0} userRole={userRole} />
      <TodoList groupId={todoLists?.groupId as number} taskList={todoLists?.taskList || []} />
      <TeamReport taskLists={todoLists?.taskList || []} />
      <TeamMember members={members} userId={userId} userRole={userRole} groupId={groupId} />
    </Container>
  );
}
