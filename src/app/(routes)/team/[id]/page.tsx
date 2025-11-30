"use client";
import { redirect } from "next/navigation";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { Container } from "@/components/layout";
import getGroups from "@/api/team/get-groups";
import { GetGroupsResponse, TodoListProps } from "@/types/group";
import { Member } from "@/types/tasklist";
import { TeamTitle, TodoList, TeamMember, TeamReport } from "@/components/features/team";
import { useAuthStore } from "@/store/auth.store";
import TeamSkeleton from "@/components/skeleton-ui/team-skeleton";

export default function TeamPages() {
  const param = useParams();
  const groupId = Number(param.id);
  const user = useAuthStore(state => state.user);
  const initialized = useAuthStore(state => state.initialized);

  const [userRole, setUserRole] = useState("MEMBER");
  const [members, setMembers] = useState<Member[]>([]);
  const [todoLists, setTodoLists] = useState<TodoListProps>();

  const { isPending, data: groupData } = useQuery<GetGroupsResponse, Error>({
    queryKey: ["getGroups", groupId],
    queryFn: () => getGroups(groupId),
  });

  useEffect(() => {
    if (groupData) {
      setMembers(groupData.members);
      setTodoLists({ groupId: groupData.id, taskList: groupData.taskLists });
    }
  }, [groupData]);

  useEffect(() => {
    if (user?.memberships) {
      const isBeing = user.memberships.filter(mb => mb.groupId === Number(groupId));
      setUserRole(isBeing[0].role);
    }
  }, [user]);

  if (!initialized) {
    return <TeamSkeleton />;
  }

  if (!user) {
    redirect("/");
  }
  const { id: userId } = user;

  if (isPending) return <TeamSkeleton />;
  if (!groupData) return <h1>팀이 없습니다.</h1>;

  return (
    <Container>
      <TeamTitle name={groupData.name} id={groupData.id} userRole={userRole} />
      <TodoList groupId={todoLists?.groupId as number} taskList={todoLists?.taskList || []} />
      {userRole === "ADMIN" && <TeamReport taskLists={todoLists?.taskList || []} />}
      <TeamMember members={members} userId={userId} userRole={userRole} groupId={groupData.id} />
    </Container>
  );
}
