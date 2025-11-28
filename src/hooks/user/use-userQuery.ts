import getUser from "@/api/user/get-user";
import patchUser from "@/api/user/patch-user";
import { devConsoleError } from "@/lib/error";
import { ChangeProfileSchema } from "@/lib/schema";
import { useToast } from "@/providers/toast-provider";
import { useAuthStore } from "@/store/auth.store";
import { User } from "@/types/user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import patchPassword from "@/api/user/patch-password";
import useLogout from "../use-logout";
import deleteUser from "@/api/user/delete-user";

export const useUserQuery = () => {
  return useQuery<User>({
    queryKey: ["user"],
    queryFn: getUser,
    staleTime: 1000 * 60 * 2,
    retry: false,
  });
};

export const useUserUpdateQuery = () => {
  const queryClient = useQueryClient();
  const { updateUser } = useAuthStore.getState().actions;
  const { showToast } = useToast();

  return useMutation({
    mutationFn: patchUser,

    onMutate: async (payload: ChangeProfileSchema) => {
      const prevUser = queryClient.getQueryData(["user"]);
      updateUser(payload);
      return { prevUser };
    },

    onSuccess: () => {
      showToast("프로필이 변경되었습니다.", "success");
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },

    onError: (error, _payload, context) => {
      devConsoleError(error);
      if (context?.prevUser) updateUser(context.prevUser);
      showToast("프로필 변경에 실패했습니다.\n 잠시 후 다시 시도해주세요", "error");
    },
  });
};

export const usePasswordChange = (onClose: () => void) => {
  const { showToast } = useToast();
  return useMutation({
    mutationFn: patchPassword,
    onSuccess: () => {
      showToast("비밀번호가 변경되었습니다.", "success");
      onClose();
    },
    onError: err => {
      devConsoleError(err);
      showToast("비밀번호 변경에 실패했습니다.\n 잠시 후 다시 시도해주세요", "error");
    },
  });
};

export const useUserDelete = () => {
  const { showToast } = useToast();
  const logout = useLogout();

  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      logout();
      showToast("회원 탈퇴가 완료되었습니다.", "success");
    },
    onError: err => {
      devConsoleError(err);
      showToast("회원 탈퇴에 실패했습니다.\n 잠시 후 다시 시도해주세요", "error");
    },
  });
};
