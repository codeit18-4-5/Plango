import axiosInstance from "@/lib/axios";
import { PostArticleComment } from "@/types/article-comment";

const postArticleComment = async (articleId: number, data: PostArticleComment) => {
  const res = await axiosInstance.post(`/articles/${articleId}/comments`, data);
  return res;
};
export default postArticleComment;
