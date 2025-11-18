import axiosInstance from "@/lib/axios";
import { CreateArticleData } from "@/types/article";

const postArticle = async (articleData: CreateArticleData) => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjM5MiwidGVhbUlkIjoiMTgtNSIsInNjb3BlIjoiYWNjZXNzIiwiaWF0IjoxNzYzNDgyNDg2LCJleHAiOjE3NjM0ODYwODYsImlzcyI6InNwLWNvd29ya2VycyJ9.4_ezutn_-zrMBzaI_JDKx8G8eBX_ZgtBSBQc8DAh-ks";
  const res = await axiosInstance.post("/articles", articleData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};
export default postArticle;
