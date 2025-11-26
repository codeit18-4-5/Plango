import getUser from "@/api/user/get-user";
import patchUser from "@/api/user/patch-user";
import { devConsoleError } from "@/lib/error";
import { ChangeProfileSchema } from "@/lib/schema";
import { useAuthStore } from "@/store/auth.store";
import { User } from "@/types/user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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

  return useMutation({
    mutationFn: patchUser,

    onMutate: async (payload: ChangeProfileSchema) => {
      const prevUser = queryClient.getQueryData(["user"]);
      updateUser(payload);
      return { prevUser };
    },

    onError: (error, _payload, context) => {
      devConsoleError(error);
      if (context?.prevUser) updateUser(context.prevUser);
      alert("프로필 변경에 실패했습니다.");
    },

    onSuccess: () => {
      alert("프로필이 변경되었습니다.");
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
};
