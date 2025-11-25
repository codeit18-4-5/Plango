"use client";

import { usetMemberPermission } from "@/hooks/taskList/use-tasklist";
import { useAuthStore } from "@/store/auth.store";
import { MemberInfo } from "@/types/tasklist";
import React, { createContext, useContext, useEffect, useState } from "react";

type TeamPermissionType = {
  isTeam: boolean;
  isLoading: boolean;
  memberInfo: MemberInfo | null;
  refresh: () => Promise<void>;
};

const TeamPermissionContext = createContext<TeamPermissionType | undefined>(undefined);

export default function TeamPermissionProvider({
  groupId,
  children,
}: {
  groupId: number;
  children: React.ReactNode;
}) {
  const { user, initialized } = useAuthStore();
  const [memberInfo, setMemberInfo] = useState<MemberInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const {
    data,
    refetch,
    isLoading: queryLoading,
  } = usetMemberPermission({
    groupId,
    userId: user?.id,
  });

  useEffect(() => {
    if (!initialized) return;

    setIsLoading(queryLoading);
    setMemberInfo(data ?? null);
  }, [initialized, queryLoading, data]);

  const refresh = async () => {
    setIsLoading(true);
    const result = await refetch();
    setMemberInfo(result.data ?? null);
    setIsLoading(false);
  };

  if (!initialized || !user) return null;

  const isTeam = !!memberInfo;

  return (
    <TeamPermissionContext.Provider value={{ isTeam, isLoading, memberInfo, refresh }}>
      {children}
    </TeamPermissionContext.Provider>
  );
}

export function useTeamPermission() {
  const context = useContext(TeamPermissionContext);
  if (!context) {
    throw new Error("team permission context error");
  }
  return context;
}
