"use client";
import { useState, useEffect } from "react";
import { useAuthStore } from "@/store/auth.store";
import { Header } from "@/components/layout";
import { DropdownOption } from "@/types/option";

export default function RoutesLayout({ children }: { children: React.ReactNode }) {
  const [group, setGroup] = useState<DropdownOption[] | null>(null);

  const user = useAuthStore(state => state.user);

  useEffect(() => {
    if (user) {
      const userGroupInfo =
        user.memberships?.map(mb => {
          const groupInfo: DropdownOption = {
            id: mb.group.id,
            name: mb.group.name,
            image: mb.group.image,
          };
          return groupInfo;
        }) || [];
      setGroup(userGroupInfo);
    } else {
      setGroup(null);
    }
  }, [user]);

  return (
    <>
      <Header isLoginPage={false} groups={group} user={user} />
      {children}
    </>
  );
}
