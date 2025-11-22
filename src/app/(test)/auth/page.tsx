"use client";

import deleteUser from "@/api/user/delete-user";
import patchUser from "@/api/user/patch-user";
import { Button, Form, Input } from "@/components/ui";
import { useLogout } from "@/hooks";
import { nicknameErrorHandler } from "@/lib/error";
import { changeProfileSchema, ChangeProfileSchema } from "@/lib/schema";
import { useAuthStore } from "@/store/auth.store";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useFormContext } from "react-hook-form";

function ProfileUpdate() {
  const {
    register,
    formState: { errors },
  } = useFormContext<ChangeProfileSchema>();
  return (
    <>
      <Input id="nickname" errorMsg={errors?.nickname?.message}>
        <Input.Label label="닉네임" caption="(닉네임 중복 불가, 최대 10자)" />
        <Input.Field {...register("nickname")} placeholder="닉네임을 입력해주세요." />
        <Input.Error />
      </Input>
      <Button type="submit" className="mt-4">
        변경
      </Button>
    </>
  );
}
export default function HomePage() {
  const { user, accessToken, initialized } = useAuthStore();
  const logout = useLogout();
  if (!initialized) {
    return null;
  }
  if (!user)
    return (
      <div className="flex items-center gap-2 p-2">
        <div>로그인이 필요합니다</div>
        <Link href={"/login"} className="border p-2">
          로그인
        </Link>
        <Link href={"/signup"} className="border p-2">
          회원가입
        </Link>
      </div>
    );

  const { id, image, email, teamId, nickname, memberships } = user;
  const handleSubmit = async (data: ChangeProfileSchema) => {
    const prev = useAuthStore.getState().user;
    const { updateUser } = useAuthStore.getState().actions;

    // 낙관적 갱신
    updateUser({ nickname: data.nickname });

    try {
      await patchUser({ nickname: data.nickname });
    } catch (err) {
      // 실패 시 롤백
      updateUser({ nickname: prev?.nickname ?? "" });
      throw err;
    }
  };

  const handleDelete = async () => {
    try {
      await deleteUser();
    } finally {
      logout();
    }
  };
  return (
    <div className="p-8">
      <h2>Zustand에 저장된 목록</h2>
      <p className="break-all">현재 액세스 토큰: {accessToken ?? "없음"}</p>
      <p>현재 user id: {id ?? "없음"}</p>
      <p>현재 user image: {image ?? "없음"}</p>
      <p>현재 user nickname: {nickname ?? "없음"}</p>
      <p>현재 user email: {email ?? "없음"}</p>
      <p>현재 user teamId: {teamId ?? "없음"}</p>
      <p>현재 user memberships: {String(Boolean(memberships))}</p>
      <Form<ChangeProfileSchema>
        onSubmit={handleSubmit}
        onServerError={nicknameErrorHandler}
        resolver={zodResolver(changeProfileSchema)}
        mode="onBlur"
        reValidateMode="onBlur"
      >
        <ProfileUpdate />
      </Form>
      <button onClick={() => logout()} className="mt-4 border p-2">
        로그아웃
      </button>
      <button onClick={handleDelete} className="mt-4 border p-2">
        회원탈퇴
      </button>
    </div>
  );
}
