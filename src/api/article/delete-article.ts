import axiosInstance from "@/lib/axios";

const deleteArticle = async ({ articleId }: { articleId: number }) => {
  const res = await axiosInstance.delete(`/articles/${articleId}`);
  return res.data;
};

export default deleteArticle;
