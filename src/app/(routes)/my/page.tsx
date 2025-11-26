"use client";

import patchUser from "@/api/user/patch-user";
import { PasswordChangeModal, ProfileUpdateFormField, UserDelete } from "@/components/features/my";
import { Container } from "@/components/layout";
import { Button, Form } from "@/components/ui";
import { useToggle } from "@/hooks";
import { nicknameErrorHandler } from "@/lib/error";
import { changeProfileSchema, ChangeProfileSchema } from "@/lib/schema";
import { useAuthStore } from "@/store/auth.store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function My() {
  const user = useAuthStore(state => state.user);
  const { isOpen, setOpen, setClose } = useToggle();

  const formMethods = useForm<ChangeProfileSchema>({
    resolver: zodResolver(changeProfileSchema),
    mode: "onBlur",
    reValidateMode: "onBlur",
  });

  useEffect(() => {
    if (user) {
      formMethods.reset({
        nickname: user.nickname,
        image: user?.image ?? undefined,
      });
    }
  }, [user]);

  const handleSubmit = async (data: ChangeProfileSchema) => {
    const prevUser = useAuthStore.getState().user;
    const { updateUser } = useAuthStore.getState().actions;
    const payload: ChangeProfileSchema = {};
    if (data.nickname !== prevUser?.nickname) {
      payload.nickname = data.nickname;
    }
    if (data.image !== prevUser?.image) {
      payload.image = data.image;
    }
    if (Object.keys(payload).length === 0) {
      return alert("변경된 내용이 없습니다.");
    }
    // 낙관적 갱신
    updateUser(payload);

    try {
      await patchUser(payload);
      //@TODO toast로 변경
      alert("프로필이 변경되었습니다");
    } catch (err) {
      // 실패 시 롤백
      updateUser({
        nickname: prevUser?.nickname ?? "",
        image: prevUser?.image ?? "",
      });
      throw err;
    }
  };

  return (
    <Container as={"main"} className="max-w-[792px] pb-4">
      <section className="flex flex-col gap-6">
        <h2 className="text-heading-m tablet:text-heading-s">계정 설정</h2>
        <Form<ChangeProfileSchema>
          id="profileForm"
          form={formMethods}
          onSubmit={handleSubmit}
          onServerError={nicknameErrorHandler}
        >
          <ProfileUpdateFormField
            email={user?.email ?? "이메일은 변경할 수 없습니다"}
            onModalOpen={setOpen}
          />
        </Form>
        <div className="flex items-center justify-between gap-4">
          <UserDelete />
          <Button form="profileForm" type="submit" className="w-1/4 self-end">
            프로필 변경
          </Button>
        </div>
      </section>
      {isOpen && <PasswordChangeModal isOpen onClose={setClose} />}
    </Container>
  );
}
