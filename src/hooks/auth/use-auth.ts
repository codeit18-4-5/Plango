"use client";

import { useMutation } from "@tanstack/react-query";
import postSignIn from "@/api/auth/post-signin";
import postSignUp from "@/api/auth/post-signup";
import { AuthSuccessPayload, OauthProvider } from "@/types/auth";
import { SignInSchema, SignUpSchema } from "@/lib/schema";
import { useRouter } from "next/router";
import { useToast } from "@/providers/toast-provider";
import patchResetPassword from "@/api/user/patch-reset-password";
import { UserResetPassword } from "@/types/user";
import { AxiosError } from "axios";
import useAuthSuccess from "../use-auth-success";
import postSignInProvider from "@/api/auth/post-signin-provider";
import { devConsoleError } from "@/lib/error";

export const useSignInMutation = (onSuccess: (data: AuthSuccessPayload) => void) => {
  return useMutation<AuthSuccessPayload, AxiosError, SignInSchema>({
    mutationFn: postSignIn,
    retry: 1,
    onSuccess,
  });
};

export const useSignUpMutation = (onSuccess: (data: AuthSuccessPayload) => void) => {
  return useMutation<AuthSuccessPayload, AxiosError, SignUpSchema>({
    mutationFn: postSignUp,
    retry: 1,
    onSuccess,
  });
};

export const useResetPassword = () => {
  const router = useRouter();
  const { showToast } = useToast();

  return useMutation<void, AxiosError, UserResetPassword>({
    mutationFn: patchResetPassword,
    retry: 1,
    onSuccess: () => {
      showToast("비밀번호가 변경되었습니다.", "success");
      router.replace("/login");
    },
    onError: err => {
      devConsoleError(err);
      showToast("비밀번호 재설정에 실패하였습니다.\n잠시 후 다시 시도해주세요", "error");
    },
  });
};

export const useKakaoLogin = () => {
  const authSuccess = useAuthSuccess();

  return useMutation<AuthSuccessPayload, AxiosError, OauthProvider>({
    mutationFn: postSignInProvider,
    retry: 0,

    onSuccess: async data => {
      await authSuccess(data);
    },

    onError: err => {
      devConsoleError(err);
    },
  });
};
