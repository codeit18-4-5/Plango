"use client";
import { redirect, notFound } from "next/navigation";
import { useState, useEffect } from "react";
import { Container } from "@/components/layout";
import { GetGroupsResponse, TodoListProps } from "@/types/group";
import { Member } from "@/types/tasklist";
import { TeamTitle, TodoList, TeamMember, TeamReport } from "@/components/features/team";
import { useAuthStore } from "@/store/auth.store";
import { useToast } from "@/providers/toast-provider";
import TeamSkeleton from "@/components/skeleton-ui/team-skeleton";

export default function TeamClientPages({
  groupId,
  groups,
}: {
  groupId: number;
  groups: GetGroupsResponse;
}) {
  const { showToast } = useToast();

  const user = useAuthStore(state => state.user);
  const initialized = useAuthStore(state => state.initialized);

  const [userRole, setUserRole] = useState("MEMBER");
  const [members, setMembers] = useState<Member[]>([]);
  const [todoLists, setTodoLists] = useState<TodoListProps>();

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

  useEffect(() => {
    if (user?.memberships) {
      const isBeing = user.memberships.filter(mb => mb.groupId === Number(groupId));
      if (isBeing[0]?.role) {
        setUserRole(isBeing[0].role);
      }
    }
  }, [user]);

  if (!initialized) {
    return <TeamSkeleton />;
  }

  if (!user) {
    redirect("/");
  }

  const isMember = user.memberships?.some(mb => mb.groupId === groupId);

  if (!isMember) {
    notFound();
  }

  const { id: userId } = user;

  return (
    <Container>
      <TeamTitle name={groups.name} id={groups.id} userRole={userRole} />
      <TodoList groupId={todoLists?.groupId as number} taskList={todoLists?.taskList || []} />
      <TeamReport taskLists={todoLists?.taskList || []} />
      <TeamMember members={members} userId={userId} userRole={userRole} groupId={groups.id} />
    </Container>
  );
}
