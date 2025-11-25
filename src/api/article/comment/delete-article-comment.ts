import axiosInstance from "@/lib/axios";

const deleteArticleComment = async ({ commentId }: { commentId: number }) => {
  const res = await axiosInstance.delete(`/comments/${commentId}`);
  return res.data;
};

export default deleteArticleComment;
