import axiosInstance from "@/lib/axios";
import { ImagesUpload } from "@/types/api";

const postImagesUpload = async (data: ImagesUpload) => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjM5MiwidGVhbUlkIjoiMTgtNSIsInNjb3BlIjoiYWNjZXNzIiwiaWF0IjoxNzYzNDg1Mzg4LCJleHAiOjE3NjM0ODg5ODgsImlzcyI6InNwLWNvd29ya2VycyJ9.JaoZFYF_rJSCg9O8HB630Ddqc_i0GbTXvrZnhQQTFOo";

  const formData = new FormData();
  if (data.url) {
    formData.append("image", data.url);
  }

  const res = await axiosInstance.post("/images/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export default postImagesUpload;
