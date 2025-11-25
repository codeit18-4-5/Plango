import axiosInstance from "@/lib/axios";
import { ArticleComments, GetArticleCommentParams } from "@/types/article-comment";

const getArticleComments = async (params?: GetArticleCommentParams): Promise<ArticleComments> => {
  const res = await axiosInstance.get(`/articles/${params?.articleId}/comments`, {
    params: {
      ...params,
      limit: params?.limit ?? 4,
    },
  });
  return res.data;
};

export default getArticleComments;
