"use client";
import IcGear from "@/assets/icons/ic-setting.svg";
import { useCallback } from "react";
import { Dropdown } from "@/components/ui";
import { teamTitleProps } from "@/types/group";
import { teamTitleStyle } from "./team.styles";
import deleteTeam from "@/api/team/delete-team";
import { useAlert } from "@/providers/alert-provider";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useToast } from "@/providers/toast-provider";
import { devConsoleError } from "@/lib/error";
import { useQueryClient } from "@tanstack/react-query";

export default function TeamTitle({ name, id, userRole }: teamTitleProps) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { showAlert } = useAlert();
  const { showToast } = useToast();

  const { mutate } = useMutation({
    mutationFn: deleteTeam,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getUser"] });
      router.replace("/");
    },
    onError: error => {
      showToast("팀 삭제에 문제가 생겼습니다.", "error");
      devConsoleError(error);
    },
  });

  const handleTeamDelete = useCallback(
    async (id: number) => {
      const message = `${name}팀을 삭제하시겠습니까?`;
      const confirmed = await showAlert(message);
      if (confirmed) {
        mutate(id);
      }
    },
    [id],
  );

  return (
    <>
      <section className={teamTitleStyle}>
        <h2 className="z-10 text-xl font-bold">{name}</h2>
        {userRole === "ADMIN" && (
          <Dropdown intent="icon">
            <Dropdown.TriggerIcon>
              <IcGear className="h-6 w-6" />
            </Dropdown.TriggerIcon>
            <Dropdown.Menu size="md">
              <Dropdown.Option align="center" size="sm" as="a" href={`/team/${id}/edit`}>
                수정하기
              </Dropdown.Option>
              <Dropdown.Option align="center" size="sm" onClick={() => handleTeamDelete(id)}>
                삭제하기
              </Dropdown.Option>
            </Dropdown.Menu>
          </Dropdown>
        )}
      </section>
    </>
  );
}
