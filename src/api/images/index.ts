import axiosInstance from "@/lib/axios";

const postImage = async (param?: string): Promise<string | undefined> => {
  const res = await axiosInstance.post("/images/upload", param);
  return res.data;
};

export default postImage;
