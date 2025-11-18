import axiosInstance from "@/lib/axios";
import { CreateArticleData } from "@/types/article";

const postArticle = async (articleData: CreateArticleData) => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjM5MiwidGVhbUlkIjoiMTgtNSIsInNjb3BlIjoiYWNjZXNzIiwiaWF0IjoxNzYzNDg1Mzg4LCJleHAiOjE3NjM0ODg5ODgsImlzcyI6InNwLWNvd29ya2VycyJ9.JaoZFYF_rJSCg9O8HB630Ddqc_i0GbTXvrZnhQQTFOo";
  const res = await axiosInstance.post("/articles", articleData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};
export default postArticle;
