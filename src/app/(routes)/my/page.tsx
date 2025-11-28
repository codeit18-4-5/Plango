"use client";

import {
  ProfileEmpty,
  ProfileUpdateFormField,
  UserDelete,
  UserPasswordChangeModal,
} from "@/components/features/my";
import { Container } from "@/components/layout";
import ProfileSkeleton from "@/components/skeleton-ui/profile-skeleton";
import { Button, Form } from "@/components/ui";
import { useToggle } from "@/hooks";
import { useUserQuery, useUserUpdateQuery } from "@/hooks/user/use-userQuery";
import { nicknameErrorHandler } from "@/lib/error";
import { changeProfileSchema, ChangeProfileSchema } from "@/lib/schema";
import { useToast } from "@/providers/toast-provider";
import { useAuthStore } from "@/store/auth.store";
import { zodResolver } from "@hookform/resolvers/zod";

export default function My() {
  const { data: userData, isPending: isLoading, isError } = useUserQuery();
  const { mutate, isPending } = useUserUpdateQuery();
  const user = useAuthStore(state => state.user);
  const { isOpen, setOpen, setClose } = useToggle();
  const { showToast } = useToast();

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
      return showToast("변경된 내용이 없습니다.", "error");
    }

    mutate(payload);
  };

  if (isLoading) return <ProfileSkeleton />;

  if (isError) {
    return (
      <ProfileEmpty msg="히스토리를 불러오지 못했습니다.">
        <Button className="mt-4" size="md" onClick={() => window.location.reload()}>
          다시 시도
        </Button>
      </ProfileEmpty>
    );
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
          <UserDelete email={user?.email} />
          <Button
            form="profileForm"
            type="submit"
            className="ml-auto w-1/4 self-end"
            disabled={isPending}
          >
            프로필 변경
          </Button>
        </div>
      </section>
      {isOpen && <UserPasswordChangeModal isOpen onClose={setClose} />}
    </Container>
  );
}
