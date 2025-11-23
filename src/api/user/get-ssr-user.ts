import { serverFetch } from "@/lib/server/server-fetch";
import { User } from "@/types/user";

const getSSRUser = async (): Promise<User | null> => {
  try {
    return await serverFetch<User>("/user", {
      method: "GET",
    });
  } catch {
    return null;
  }
};

export default getSSRUser;
