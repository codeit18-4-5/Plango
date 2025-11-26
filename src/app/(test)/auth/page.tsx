"use client";

import deleteUser from "@/api/user/delete-user";
import { useLogout } from "@/hooks";
import { getAccessToken } from "@/lib/token";
import { useAuthStore } from "@/store/auth.store";
import Link from "next/link";
import { useToast } from "@/providers/toast-provider";

export default function HomePage() {
  const { showToast } = useToast();
  const user = useAuthStore(state => state.user);
  const accessToken = getAccessToken();
  const initialized = useAuthStore(state => state.initialized);
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

  const handleDelete = async () => {
    try {
      await deleteUser();
    } finally {
      logout();
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-xl">테스트 페이지</h1>
      <br />

      <p className="break-all">현재 액세스 토큰(쿠키): {accessToken ?? "없음"}</p>
      <br />
      <h2>Zustand에 저장된 목록</h2>
      <p>현재 user id: {id ?? "없음"}</p>
      <p>현재 user image: {image ?? "없음"}</p>
      <p>현재 user nickname: {nickname ?? "없음"}</p>
      <p>현재 user email: {email ?? "없음"}</p>
      <p>현재 user teamId: {teamId ?? "없음"}</p>
      <p>현재 user memberships: {JSON.stringify(memberships)}</p>

      <button onClick={() => logout()} className="mt-4 justify-between border p-2">
        로그아웃
      </button>
      <button onClick={handleDelete} className="mt-4 border p-2" disabled>
        회원탈퇴(disabled)
      </button>

      <button onClick={() => showToast("일반 토스트")} className="mt-4 border p-2">
        기본 토스트 띄우기
      </button>
      <button
        onClick={() => showToast("데이터 불러오기 성공!", "success")}
        className="mt-4 border p-2"
      >
        성공 토스트 띄우기
      </button>

      <button
        onClick={() => showToast("데이터 불러오기 실패!", "error")}
        className="mt-4 border p-2"
      >
        실패 토스트 띄우기
      </button>
      <button onClick={() => showToast(<p>커스텀 토스트</p>)} className="mt-4 border p-2">
        커스텀 토스트 띄우기
      </button>
    </div>
  );
}
