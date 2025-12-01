"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { Button, Input } from "@/components/ui";
import { GroupJoinRequest } from "@/types/group";
import { useAuthStore } from "@/store/auth.store";
import postTeamJoin from "@/api/team/post-join-team";
import { useToast } from "@/providers/toast-provider";

export default function TeamJoinPage() {
  const router = useRouter();
  const user = useAuthStore(state => state.user);
  const { showToast } = useToast();

  const [formData, setFormData] = useState<GroupJoinRequest>({
    userEmail: "",
    token: "",
  });

  useEffect(() => {
    const sessionToken = sessionStorage.getItem("joinToken") || null;
    if (sessionToken) {
      setFormData(fd => ({ ...fd, token: sessionToken }));
    }
  });

  useEffect(() => {
    if (user) {
      setFormData(fd => ({ ...fd, userEmail: user.email }));
    }
  }, [user]);

  const joinMutation = useMutation({
    mutationFn: postTeamJoin,
    onSuccess: res => {
      sessionStorage.setItem("teamJoinMessage", "팀에 합류했습니다.");
      router.push(`/team/${res.groupId}`);
    },
    onError: error => {
      console.log(error);
      showToast("오류가 발생했습니다", "error");
    },
  });

  const handleNameToken = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputToken = event.target.value;
    setFormData(prev => ({ ...prev, token: inputToken }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    joinMutation.mutate(formData);
  };
  return (
    <div className="mx-auto mt-[72px] h-[460px] w-[343px] tablet:mt-[100px] tablet:w-[460px] desktop:mt-[140px]">
      <h2 className="mb-[24px] w-full text-center text-[24px] tablet:mb-[80px]">팀 참여하기</h2>
      <form method="POST" className="w-full" onSubmit={handleSubmit}>
        <Input id="teamName">
          <Input.Label label="팀 토큰" />
          <Input.Field
            type="text"
            className="mb-[40px] h-[48px]"
            placeholder="팀 토큰을 입력해주세요."
            onChange={handleNameToken}
            value={formData.token}
          />
        </Input>
        <Button as="button" type="submit" className="mb-[24px] h-[47px] w-full">
          참여하기
        </Button>
      </form>
      <p className="w-full text-center text-[14px] tablet:text-[16px]">
        공유받은 팀 토큰을 통해 참여할 수 있어요.
      </p>
    </div>
  );
}
