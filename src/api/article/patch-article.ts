import axiosInstance from "@/lib/axios";
import { CreateArticleData } from "@/types/article";

const patchArticle = async (articleId: number, data: CreateArticleData) => {
  const res = await axiosInstance.patch(`/articles/${articleId}`, data, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjM5MiwidGVhbUlkIjoiMTgtNSIsInNjb3BlIjoiYWNjZXNzIiwiaWF0IjoxNzYzNjMwMzY0LCJleHAiOjE3NjM2MzM5NjQsImlzcyI6InNwLWNvd29ya2VycyJ9.WuEZJo3aQgHiJ0IC70GBarczT6PmcG7aKhrJA4Icfj4",
    },
  });
  return res;
};
export default patchArticle;
