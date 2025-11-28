import axiosInstance from "@/lib/axios";
import { CreateArticleData } from "@/types/article";

const postArticle = async (articleData: CreateArticleData) => {
  const res = await axiosInstance.post("/articles", {
    ...articleData,
    content: JSON.stringify(articleData.content),
  });
  return res;
};
export default postArticle;
