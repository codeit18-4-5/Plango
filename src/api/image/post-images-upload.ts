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
    },
  });

  return res.data;
};

export default postImagesUpload;
