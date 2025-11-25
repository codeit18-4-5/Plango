import axiosInstance from "@/lib/axios";
import { UserSendResetPasswordEmail } from "@/types/user";

const postSendResetPasswordEmail = async (data: UserSendResetPasswordEmail) => {
  const res = await axiosInstance.post("/user/send-reset-password-email", data);
  return res.data;
};
export default postSendResetPasswordEmail;
