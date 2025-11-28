"use client";

import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import deleteArticle from "@/api/article/delete-article";
import { useAuthStore } from "@/store/auth.store";
import { ArticleDetail } from "@/types/article";
import { useAlert } from "@/providers/alert-provider";
import { Dropdown } from "@/components/ui";
import IcKebab from "@/assets/icons/ic-kebab.svg";
import { useToast } from "@/providers/toast-provider";

export default function KebabMenu({
  article,
  className,
}: {
  article: ArticleDetail;
  className?: string;
}) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const currentUser = useAuthStore(state => state.user);
  const { showAlert } = useAlert();
  const { showToast } = useToast();

  const { mutate: deleteArticleMutate } = useMutation({
    mutationFn: () => deleteArticle({ articleId: article.id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getArticles"] });
      sessionStorage.setItem("articleDeleteToast", "게시글이 삭제되었습니다.");
      router.replace("/article");
    },
    onError: () => {
      showToast("게시글 삭제에 실패했습니다.", "error");
    },
  });

  const handleEdit = () => {
    router.push(`/article/${article.id}/edit`);
  };

  const handleDelete = async () => {
    const confirmed = await showAlert({ type: "deleteArticle" });
    if (confirmed) {
      deleteArticleMutate();
    }
  };

  if (currentUser?.id !== article.writer.id) return null;

  return (
    <Dropdown className={className}>
      <Dropdown.TriggerIcon
        intent="icon"
        className="duration-200 hover:text-gray-400 focus:text-gray-200 active:text-gray-300"
        aria-label="옵션 더보기"
      >
        <IcKebab />
      </Dropdown.TriggerIcon>
      <Dropdown.Menu size="md">
        <Dropdown.Option align="center" onClick={handleEdit}>
          수정하기
        </Dropdown.Option>
        <Dropdown.Option align="center" onClick={handleDelete}>
          삭제하기
        </Dropdown.Option>
      </Dropdown.Menu>
    </Dropdown>
  );
}
