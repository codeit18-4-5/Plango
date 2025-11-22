import axiosInstance from "@/lib/axios";
import { PatchArticleComment } from "@/types/article-comment";

const patchArticleComment = async (commentId: number, data: PatchArticleComment) => {
  const res = await axiosInstance.patch(`/comments/${commentId}`, data);
  return res;
};
export default patchArticleComment;
