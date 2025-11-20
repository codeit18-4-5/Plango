import axiosInstance from "@/lib/axios";
import { ImagesUpload } from "@/types/api";

const postImagesUpload = async (data: ImagesUpload) => {
  const formData = new FormData();
  if (data.url) {
    formData.append("image", data.url);
  }

  const res = await axiosInstance.post("/images/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjM5MiwidGVhbUlkIjoiMTgtNSIsInNjb3BlIjoiYWNjZXNzIiwiaWF0IjoxNzYzNjMwMzY0LCJleHAiOjE3NjM2MzM5NjQsImlzcyI6InNwLWNvd29ya2VycyJ9.WuEZJo3aQgHiJ0IC70GBarczT6PmcG7aKhrJA4Icfj4",
    },
  });

  return res.data;
};

export default postImagesUpload;
