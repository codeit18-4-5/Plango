import axiosInstance from "@/lib/axios";
import { CreateArticleData } from "@/types/article";

const postArticle = async (articleData: CreateArticleData) => {
  const res = await axiosInstance.post("/articles", articleData, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjM5MiwidGVhbUlkIjoiMTgtNSIsInNjb3BlIjoiYWNjZXNzIiwiaWF0IjoxNzYzNjMwMzY0LCJleHAiOjE3NjM2MzM5NjQsImlzcyI6InNwLWNvd29ya2VycyJ9.WuEZJo3aQgHiJ0IC70GBarczT6PmcG7aKhrJA4Icfj4",
    },
  });
  return res;
};
export default postArticle;
