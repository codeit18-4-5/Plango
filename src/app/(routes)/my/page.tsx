"use client";

import { PasswordChangeModal, ProfileUpdateFormField, UserDelete } from "@/components/features/my";
import { Container } from "@/components/layout";
import ProfileSkeleton from "@/components/skeleton-ui/profile-skeleton";
import { Button, Form } from "@/components/ui";
import { useToggle } from "@/hooks";
import { useUserQuery, useUserUpdateQuery } from "@/hooks/user/use-userQuery";
import { nicknameErrorHandler } from "@/lib/error";
import { changeProfileSchema, ChangeProfileSchema } from "@/lib/schema";
import { useAuthStore } from "@/store/auth.store";
import { zodResolver } from "@hookform/resolvers/zod";

export default function My() {
  const { data: userData, isLoading } = useUserQuery();
  const { mutate } = useUserUpdateQuery();
  const user = useAuthStore(state => state.user);
  const { isOpen, setOpen, setClose } = useToggle();

  const handleSubmit = async (data: ChangeProfileSchema) => {
    const prevUser = useAuthStore.getState().user;
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

    mutate(payload);
  };

  if (isLoading) {
    return <ProfileSkeleton />;
  }
  return (
    <Container as={"main"} className="max-w-[792px] pb-4">
      <section className="flex flex-col gap-6">
        <h2 className="text-heading-m tablet:text-heading-s">계정 설정</h2>
        <Form<ChangeProfileSchema>
          id="profileForm"
          onSubmit={handleSubmit}
          onServerError={nicknameErrorHandler}
          resolver={zodResolver(changeProfileSchema)}
          mode="onBlur"
          reValidateMode="onBlur"
          defaultValues={{
            nickname: userData?.nickname,
            image: userData?.image ?? undefined,
          }}
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
