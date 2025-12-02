"use client";
import { useCallback } from "react";
import cn from "@/lib/cn";
import IcKebab from "@/assets/icons/ic-kebab.svg";
import { Member } from "@/types/tasklist";
import { Avatar, Dropdown } from "@/components/ui";
import { useAlert } from "@/providers/alert-provider";
import deleteMember from "@/api/team/delete-member";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useToast } from "@/providers/toast-provider";
import { devConsoleError } from "@/lib/error";

const gridStyle =
  "grid grid-cols-3 grid-rows-2 grid-cols-[24px_1fr_16px] tablet:grid-cols-[32px_1fr_16px] gap-x-2 tablet:gap-x-3";

type MemberCardProps = {
  member: Member;
  userRole: string;
  userId: number;
};

export default function MemberCard({ member, userRole, userId }: MemberCardProps) {
  const { showAlert } = useAlert();
  const { showToast } = useToast();
  const queryClient = useQueryClient();
  const router = useRouter();

  const isAdmin = userRole === "ADMIN";
  const mySelf = member.userId === userId;
  const dropdownCheck = isAdmin || mySelf;
  const adminMessage = `${member.userName}을(를) 정말 내보내시겠습니까?`;
  const membrMessage = `정말 팀을 나가시겠습니까?`;

  const useDeleteMember = useMutation({
    mutationFn: deleteMember,
    onSuccess: (res, param) => {
      const { groupId } = param;
      if (isAdmin) {
        queryClient.invalidateQueries({
          queryKey: ["getGroups", groupId],
        });
        showToast("내보내기가 완료되었습니다.", "success");
      } else {
        router.replace("/");
        //TODO 랜딩페이지에 추가
      }
    },
    onError: error => {
      devConsoleError(error);
      showToast("문제가 발생했습니다.", "error");
    },
  });

  const handlerMemberDelete = useCallback(
    async (groupId: number, userId: number, message: string) => {
      if (isAdmin && mySelf) {
        showAlert(`팀장은 스스로 내보내기를 할 수 없습니다.`);
        return;
      }

      const confirmed = await showAlert(message);
      if (confirmed) {
        useDeleteMember.mutate({ groupId, userId });
      }
    },
    [showAlert],
  );

  return (
    <div className="rounded-2xl bg-gray-800 px-6 py-4 tablet:py-5">
      <div className={cn(gridStyle, "items-center")}>
        <Avatar
          image={member.userImage}
          className="cols-start-1 h-6 w-6 tablet:row-span-2 tablet:row-start-1 tablet:h-8 tablet:w-8"
        />
        <p className="text-sm text-white">{member.userName}</p>
        {dropdownCheck && (
          <Dropdown intent="icon" className="cols-start-3 row-span-2">
            <Dropdown.TriggerIcon>
              <IcKebab className="h-4 w-4 text-gray-400" />
            </Dropdown.TriggerIcon>
            <Dropdown.Menu size="md">
              {isAdmin ? (
                <Dropdown.Option
                  align="center"
                  size="sm"
                  as="button"
                  onClick={() => handlerMemberDelete(member.groupId, member.userId, adminMessage)}
                >
                  내보내기
                </Dropdown.Option>
              ) : (
                <Dropdown.Option
                  align="center"
                  size="sm"
                  as="button"
                  onClick={() => handlerMemberDelete(member.groupId, member.userId, membrMessage)}
                >
                  나가기
                </Dropdown.Option>
              )}
            </Dropdown.Menu>
          </Dropdown>
        )}
        <p className="cols-span-2 cols-start-1 tablet:cols-start-2 tablet:cols-span-1 row-start-2 text-xs text-gray-400">
          {member.userEmail}
        </p>
      </div>
    </div>
  );
}
