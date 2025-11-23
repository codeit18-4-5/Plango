import { serverApi, serverFetch } from "@/lib/server/server-fetch";
import { UserHistoryResponse } from "@/types/user";

const getSSRHistory = async () => {
  return serverApi(() =>
    serverFetch<UserHistoryResponse>(`/user/history`, {
      method: "GET",
    }),
  );
};
export default getSSRHistory;
