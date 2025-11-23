import { serverApi, serverFetch } from "@/lib/server/server-fetch";
import { User } from "@/types/user";

const getSSRUser = async () => {
  return serverApi(() =>
    serverFetch<User>(`/user`, {
      method: "GET",
    }),
  );
};
export default getSSRUser;
